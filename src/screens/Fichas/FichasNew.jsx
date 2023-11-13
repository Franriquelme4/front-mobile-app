import React, { useState, useEffect } from 'react';
import { Heading, View, FormControl, Stack, Input, Button, Select, CheckIcon, VStack, TextArea } from "native-base";
import BackToMenu from "../../components/BackToMenu";
import { saveFichaClinica } from '../../services/fichasService';
// import { getPacientes } from '../../services/pacientesService'; // Asumiendo que tienes un servicio similar
import { getCategorias, getCategoria } from '../../services/categoriasService'; // Usando tu servicio existente
import { useNavigate } from 'react-router-native';
import { getPacientes, getDoctores } from '../../services/pacientesService';

export default function FichaClinicaNew() {
    const [fichaClinica, setFichaClinica] = useState({
        turno: '',
        doctor: '',
        paciente: '',
        fecha: '',
        categoria: '',
        diagnostico: ''
    });

    const turnos = [
        { id: 1, nombre: 'Mañana' },
        { id: 2, nombre: 'Tarde' },
        { id: 3, nombre: 'Noche' }
    ];

    const [doctores, setDoctores] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    // const [personas, setPersonas] = useState([]);

    const navigation = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            const doctoresData = await getDoctores();
            const pacientesData = await getPacientes();
            const categoriasData = await getCategorias();
            console.log(doctoresData)
            console.log(pacientesData)
            setDoctores(doctoresData);
            setPacientes(pacientesData);
            setCategorias(categoriasData);
        };

        async function fetchCategorias() {
            const categoriasData = await getCategoria();
            if (categoriasData) {
                setCategorias(categoriasData);
            }
        }

        const fetchPersonas = async () => {
            const data = await getPacientes();
            const data2 = await getDoctores();
            setPacientes(data || []);
            setDoctores(data2 || []);
        };
        cargarDatos();
        fetchCategorias();
        fetchPersonas();

    }, []);

    const submitForm = async () => {
        if (Object.values(fichaClinica).every(field => field !== '')) {
            await saveFichaClinica(fichaClinica);
            navigation("/fichas-clinicas");
        }
    };

    const handleInputChange = (name, value) => {
        setFichaClinica({ ...fichaClinica, [name]: value });
    };

    return (
        <View>
            <BackToMenu />
            <Heading>Agregar Ficha Clínica</Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Turno</FormControl.Label>
                    <Select
                        selectedValue={fichaClinica.turno}
                        minWidth="200"
                        accessibilityLabel="Elegir Turno"
                        placeholder="Elegir Turno"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                        onValueChange={(itemValue) => handleInputChange('turno', itemValue)}
                    >
                        {turnos.map(turno => (
                            <Select.Item key={turno.id} label={turno.nombre} value={turno.id} />
                        ))
                        }
                    </Select>
                </FormControl>

                <FormControl>
                    <FormControl.Label>Doctor</FormControl.Label>
                    <Select
                        selectedValue={fichaClinica.doctor}
                        minWidth="200"
                        accessibilityLabel="Elegir Doctor"
                        placeholder="Elegir Doctor"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                        onValueChange={(itemValue) => handleInputChange('doctor', itemValue)}
                    >
                        {doctores.map(doctor => (
                            <Select.Item key={doctor.id} label={`${ doctor.nombre } ${ doctor.apellido }`} value={doctor.id} />
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormControl.Label>Paciente</FormControl.Label>
                    <Select
                        selectedValue={fichaClinica.paciente}
                        minWidth="200"
                        accessibilityLabel="Elegir Paciente"
                        placeholder="Elegir Paciente"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                        onValueChange={(itemValue) => handleInputChange('paciente', itemValue)}
                    >
                        {pacientes.map(paciente => (
                            <Select.Item key={paciente.id} label={`${ paciente.nombre } ${ paciente.apellido }`} value={paciente.id} />
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormControl.Label>Fecha</FormControl.Label>
                    <Input
                        type="date"
                        value={fichaClinica.fecha}
                        onChangeText={(text) => handleInputChange('fecha', text)}
                    />
                </FormControl>

                <FormControl>
                    <FormControl.Label>Categoría</FormControl.Label>
                    <Select
                        selectedValue={fichaClinica.categoria}
                        minWidth="200"
                        accessibilityLabel="Elegir Categoría"
                        placeholder="Elegir Categoría"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                        onValueChange={(itemValue) => handleInputChange('categoria', itemValue)}
                    >
                        {categorias.map(categoria => (
                            <Select.Item key={categoria.id} label={categoria.nombre} value={categoria.id} />
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormControl.Label>Diagnóstico</FormControl.Label>
                    <TextArea
                        h={20}
                        value={fichaClinica.diagnostico}
                        onChangeText={(text) => handleInputChange('diagnostico', text)}
                    />
                </FormControl>
                <Button mt="2" onPress={submitForm} >
                    Guardar
                </Button>
            </VStack>

        </View>
    );
}
