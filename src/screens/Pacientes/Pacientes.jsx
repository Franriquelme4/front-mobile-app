import React, { useEffect, useState } from 'react';
import { Heading, View, Text, Button, ScrollView } from 'native-base';
import { Link, useNavigate } from 'react-router-native';
import BackToMenu from '../../components/BackToMenu';
import { getPersonas,eliminarPersona } from '../../services/pacientesService';
import PacienteEditarModal from './PacienteEditarModal';
export default function Pacientes() {
  const [personas, setPersonas] = useState([]);
  const navigate = useNavigate();
  const navigation = useNavigate()
  const handleModalClose = () => {
    // Cierra la modal
    setModalVisible(false);
    // Limpia la persona seleccionada
    setSelectedPersona(null);
  };
  const handleEditar = (persona) => {
    // Abre la modal y guarda la persona seleccionada
    setSelectedPersona(persona);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchPersonas = async () => {
      const data = await getPersonas();
      setPersonas(data || []);
    };

    fetchPersonas();
  }, []);
  const handleEliminar = async (id) => {
    await eliminarPersona(id);
    const fetchPersonas = async () => {
      const data = await getPersonas();
      setPersonas(data || []);
    };

    fetchPersonas();
    navigation('/pacientes');
  };
  return (
    <ScrollView>
      <View>
        <BackToMenu />
        <Heading>Lista de Pacientes/Doctores</Heading>
        <Button mt={4} colorScheme="primary" onPress={() => navigate('/pacientes/agregar')}>
          Agregar Paciente/Doctor
        </Button>

        <View p={2}>
          {personas.map((persona) => (
            <View key={persona.id} mt={2} border={1} p={2} borderRadius={4}>
              <Text>Nombre: {persona.nombre}</Text>
              <Text>Apellido: {persona.apellido}</Text>
              <Text>Teléfono: {persona.telefono}</Text>
              <Text>Email: {persona.email}</Text>
              <Text>Cédula: {persona.cedula}</Text>
              <Text>Es Doctor: {persona.esDoctor ? 'Sí' : 'No'}</Text>
              <Button  colorScheme="primary" title="Editar" onPress={() => handleEditar(persona)}>
                Editar
              </Button>

              <Button  colorScheme="primary" title="Eliminar" onPress={() => handleEliminar(persona.id)} color="red" >
                Eliminar
              </Button>
            </View>
          ))}
        </View>
        
      </View>
      
    </ScrollView>


  );
}