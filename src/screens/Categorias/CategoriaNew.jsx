import React, { useState } from 'react';
import { Heading, Text, View, FormControl, Stack, Input, Button,VStack } from "native-base"
import BackToMenu from "../../components/BackToMenu"
import { getCategoria, getData, saveCategoria } from '../../services/categoriasService';

export default function CategoriaNew() {
    const [categoryName, setCategoryName] = useState('');


const submitForm = ()=>{
    // console.log("Category Name:", categoryName);
    saveCategoria(categoryName);
    console.log(getData(),"Categorias")
}
    return <View>
        <BackToMenu></BackToMenu>
        <Heading>Agregar Categoria</Heading>
        <View>
<VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Nombre de la Categoria </FormControl.Label>
            <Input               value={categoryName}
              onChangeText={(text) => setCategoryName(text)} />
          </FormControl>
          <Button mt="2" onPress={submitForm} >
            Guardar
          </Button>
        </VStack>
        </View>
    </View>
}