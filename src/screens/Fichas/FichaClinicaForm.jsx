// FichaClinicaForm.jsx
import React, { useState } from 'react';
import { Button, View, TextInput, Text, Picker } from 'react-native';
import styles from './styles';

const FichaClinicaForm = ({ doctores, pacientes, categorias, turnos }) => {
    const [fichaClinica, setFichaClinica] = useState({
        turno: '',
        doctor: '',
        paciente: '',
        fecha: '',
        categoria: '',
        diagnostico: ''
    });

    const handleSubmit = () => {
        // Lógica para guardar los datos en un array
        console.log(fichaClinica);
    };

    // Resto del código del formulario...

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Formulario de registro de fichas clínicas</Text>

            {/* Componentes del formulario */}

            <Button title="Guardar" onPress={handleSubmit} />
        </View>
    );
};

export default FichaClinicaForm;
