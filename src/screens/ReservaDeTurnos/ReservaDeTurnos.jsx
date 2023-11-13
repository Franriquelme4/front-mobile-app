import { Button, View, Text, Heading, FormControl, Select, useSafeArea } from "native-base"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-native"
import { getReservas } from "../../services/reservaTurnosService";
import { getPersona, getPersonas } from "../../services/pacientesService";
import BackToMenu from "../../components/BackToMenu";
import { turnos } from "../../constants/horariosAtencion";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function ReservaDeTurnos(){
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [fechaDesde, setFechaDesde] = useState(new Date())
    const [fechaHasta, setFechaHasta] = useState(new Date())

    useEffect(() => {
        (async () => {
            const personas = await getPersonas();
            const doctores = personas.filter(persona => persona.esDoctor);
            const pacientes = personas.filter(persona => !persona.esDoctor);
            setPacientes(pacientes);
            setDoctores(doctores);

            const reservas = await getReservas();
            const reservasConPersonas = await Promise.all(reservas.map(async reserva => {
                const turno = turnos.find(turno => turno.id === reserva.turno);
                const turnoText = turno ? `${turno.inicio} - ${turno.fin}` : '';

                return {
                    ...reserva,
                    paciente: await getPersona(reserva.paciente),
                    doctor: await getPersona(reserva.doctor),
                    turno: turnoText
                }
            }));
            setReservas(reservasConPersonas);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let reservas = [];
            if(fechaDesde || fechaHasta || selectedPaciente || selectedDoctor){
                reservas = (await getReservas()).filter(reserva => {
                    let cumple = [];

                    if(selectedPaciente && reserva.paciente == selectedPaciente){
                        cumple.push(true);
                    }else if(selectedPaciente){
                        cumple.push(false);
                    }

                    if(selectedDoctor && reserva.doctor == selectedDoctor){
                        cumple.push(true);
                    }else if(selectedDoctor){
                        cumple.push(false);
                    }

                    const fechaDes = new Date(""+fechaDesde).getTime();
                    const fechaHas = new Date(""+fechaHasta).getTime();
                    const fecha = new Date(reserva.fecha).getTime();

                    if(fechaDesde && fechaHasta && fecha >= fechaDes && fecha <= fechaHas){
                        cumple.push(true);
                    }else if(fechaDesde && fechaHasta){
                        cumple.push(false);
                    }

                    return !cumple.includes(false);
                })
            }else{
                reservas = await getReservas();
            }

            const reservasConPersonas = await Promise.all(reservas.map(async reserva => {
                const turno = turnos.find(turno => turno.id === reserva.turno);
                const turnoText = turno ? `${turno.inicio} - ${turno.fin}` : '';

                return {
                    ...reserva,
                    paciente: await getPersona(reserva.paciente),
                    doctor: await getPersona(reserva.doctor),
                    turno: turnoText
                }
            }));

            setReservas(reservasConPersonas);
        })();
    }, [fechaDesde, fechaHasta, selectedPaciente, selectedDoctor])

    return <View>
        <BackToMenu></BackToMenu>
        <Heading>Reserva de turnos</Heading>
        <Heading size='sm' mt={3}>Filtros</Heading>

        <FormControl>
            <FormControl.Label>Paciente</FormControl.Label>
            <Select placeholder="Elegir paciente" onValueChange={(paciente) => setSelectedPaciente(paciente)}>
                {pacientes.map(paciente => <Select.Item label={paciente.nombre} value={paciente.id} />)}
            </Select>
        </FormControl>
        <FormControl>
            <FormControl.Label>Doctor</FormControl.Label>
            <Select placeholder="Elegir doctor" onValueChange={(doctor) => setSelectedDoctor(doctor)}>
                {doctores.map(doctor => <Select.Item label={doctor.nombre} value={doctor.id} />)}
            </Select>
        </FormControl>

        <FormControl>
            <FormControl.Label>Fecha desde:</FormControl.Label>
            <DateTimePicker value={fechaDesde} onChange={(e,selectedDate) => setFechaDesde(selectedDate)}/>
        </FormControl>

        <FormControl>
            <FormControl.Label>Fecha hasta:</FormControl.Label>
            <DateTimePicker value={fechaHasta} onChange={(e,selectedDate) => setFechaHasta(selectedDate)}/>
        </FormControl>

        <Button mt={4} colorScheme="primary" onPress={() => navigate('/reserva-turnos/agregar')}>
          Reservar turno
        </Button>
        <View p={2}>
          {reservas.map((reserva) => (
            <View key={reserva.id} mt={2} borderWidth={1}
            borderRadius={10}
            borderColor='gray.300' p={2}>
              <Text>Paciente: {reserva.paciente.nombre}</Text>
              <Text>Doctor: {reserva.doctor.nombre}</Text>
              <Text>Fecha: {new Date(reserva.fecha).toDateString()}</Text>
              <Text>Turno: {reserva.turno}</Text>
            </View>
          ))}
        </View>
    </View>
}