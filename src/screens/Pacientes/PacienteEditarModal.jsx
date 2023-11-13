import React, { useState } from 'react';
import { Modal, View, Text, Button, TextInput } from 'react-native';
import { editarPersona } from '../../services/pacientesService';

const PacienteEditarModal = ({ isOpen, onClose, persona, onEdit }) => {
  const [nombre, setNombre] = useState(persona.nombre);
  // Agrega más estados según tus necesidades

  const handleGuardar = async () => {
    // Realiza la lógica para guardar los cambios
    await editarPersona({ ...persona, nombre });
    // Cierra la modal
    onClose();
    // Llama a la función de edición en la lista principal para actualizar la interfaz
    onEdit();
  };

  return (
    <Modal visible={isOpen} animationType="slide">
      <View>
        <Text>Editar Persona</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        {/* Agrega más campos según tus necesidades */}

        <Button title="Guardar" onPress={handleGuardar} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default PacienteEditarModal;