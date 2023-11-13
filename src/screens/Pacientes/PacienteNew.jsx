import React, { useState } from 'react';
import { Heading, View, FormControl, Input, Button, VStack, Checkbox } from 'native-base';
import BackToMenu from '../../components/BackToMenu';
import { savePersona } from '../../services/pacientesService';
import {useNavigate} from 'react-router-native';
export default function PacienteNew() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [esDoctor, setEsDoctor] = useState(false);
  const navigation = useNavigate(); 
  const submitForm = () => {
    const persona = {
      nombre,
      apellido,
      telefono,
      email,
      cedula,
      esDoctor,
    };

    savePersona(persona);
    console.log("MARIO ME CHUPA EL CULO");
    navigation('/pacientes');
    console.log("MARIO ME CHUPA EL CULO");

  };

  return (
    <View>
      <BackToMenu />
      <Heading>Agregar Persona</Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nombre</FormControl.Label>
          <Input value={nombre} onChangeText={(text) => setNombre(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellido</FormControl.Label>
          <Input value={apellido} onChangeText={(text) => setApellido(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Teléfono</FormControl.Label>
          <Input value={telefono} onChangeText={(text) => setTelefono(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input value={email} onChangeText={(text) => setEmail(text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Cédula</FormControl.Label>
          <Input value={cedula} onChangeText={(text) => setCedula(text)} />
        </FormControl>
        <FormControl>
          <Checkbox
            value={esDoctor}
            onChange={(isChecked) => setEsDoctor(isChecked)}
          >
            ¿Es Doctor?
          </Checkbox>
        </FormControl>
        <Button mt="2" onPress={submitForm}>
          Guardar
        </Button>
      </VStack>
    </View>
  );
}