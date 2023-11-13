import React, { useEffect, useState } from 'react';
import { Heading, Text, View, FormControl, Stack, Input, Button, VStack } from "native-base"
import BackToMenu from "../../components/BackToMenu"
import { editCategoria, getCategoria, getCategoriaById, getData, saveCategoria } from '../../services/categoriasService';
import { useParams } from 'react-router-native';

export default function CategoriaEditar() {
    const [categoryName, setCategoryName] = useState('');
    const { id } = useParams();

    useEffect(() => {
        // Cargar la categoría actual utilizando el ID cuando el componente se monta
        loadCategoria();
    }, [id]);

    const loadCategoria = async () => {
        try {
            // Obtener la categoría por ID
            const categoria = await getCategoriaById(id);
            // Establecer el nombre de la categoría en el estado
            setCategoryName(categoria.nombre);
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
        }
    };
    const submitForm = () => {
        editCategoria({id,nombre:categoryName})
    }
    return <View>
        <BackToMenu></BackToMenu>
        <Heading>Editar Categoria</Heading>
        <View>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Nombre de la Categoria </FormControl.Label>
                    <Input value={categoryName}
                        onChangeText={(text) => setCategoryName(text)} />
                </FormControl>
                <Button mt="2" onPress={submitForm} >
                    Guardar
                </Button>
            </VStack>
        </View>
    </View>
}