import React, { useEffect, useState } from 'react';
import { Heading, View, Text, Button, ScrollView } from 'native-base';
import { Link } from 'react-router-native';
import BackToMenu from '../../components/BackToMenu';
import { getPersonas } from '../../services/pacientesService';

export default function Pacientes() {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      const data = await getPersonas();
      setPersonas(data || []);
    };

    fetchPersonas();
  }, []);

  return (
    <ScrollView>
      <View>
        <BackToMenu />
        <Heading>Lista de Pacientes/Doctores</Heading>
        <Link to="/pacientes/agregar">
          <Button mt={4} colorScheme="primary">
            Agregar Paciente/Doctor
          </Button>
        </Link>

        <View p={2}>
          {personas.map((persona) => (
            <View key={persona.id} mt={2} border={1} p={2} borderRadius={4}>
              <Text>Nombre: {persona.nombre}</Text>
              <Text>Apellido: {persona.apellido}</Text>
              <Text>Teléfono: {persona.telefono}</Text>
              <Text>Email: {persona.email}</Text>
              <Text>Cédula: {persona.cedula}</Text>
              <Text>Es Doctor: {persona.esDoctor ? 'Sí' : 'No'}</Text>
            </View>
          ))}
        </View>
        
      </View>
    </ScrollView>
  );
}