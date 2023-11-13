import { Button, FormControl, Heading, Input, Select, VStack, View } from "native-base"
import BackToMenu from "../../components/BackToMenu"
import { useEffect, useState } from "react"
import { getPersonas } from "../../services/pacientesService";
import { turnos } from "../../constants/horariosAtencion";
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveReservaTurnos } from "../../services/reservaTurnosService";
import { useNavigate } from "react-router-native";

export default function ReservasDeTurnosNew(){
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedTurno, setSelectedTurno] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [pacientes, setPacientes] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
            const personas = await getPersonas();
            const doctores = personas.filter(persona => persona.esDoctor);
            const pacientes = personas.filter(persona => !persona.esDoctor);
            setPacientes(pacientes);
            setDoctores(doctores);
        })();
    }, []);

    const submitForm = async () => {
        await saveReservaTurnos({
            paciente: selectedPaciente,
            doctor: selectedDoctor,
            fecha: selectedDate,
            turno: selectedTurno
        })

        navigate('/reserva-turnos');
    }


    return <View>
    <BackToMenu />
    <Heading>Reservar turno</Heading>
    <VStack space={3} mt="5">
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
        <FormControl.Label>Fecha</FormControl.Label>
        <DateTimePicker value={selectedDate} onChange={(e,selectedDate) => setSelectedDate(selectedDate)}/>
      </FormControl>
      <FormControl>
        <FormControl.Label>Horario</FormControl.Label>
        <Select placeholder="Elegir horario" onValueChange={(turno) => setSelectedTurno(turno)}>
            {turnos.map(turno => <Select.Item label={`${turno.inicio} - ${turno.fin}`} value={turno.id} />)}
        </Select>
      </FormControl>
      <Button mt="2" onPress={submitForm}>
        Guardar
      </Button>
    </VStack>
  </View>
}