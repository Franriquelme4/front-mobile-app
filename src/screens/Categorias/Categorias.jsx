import { Button, View, Heading, Text, ScrollView, VStack } from "native-base";
import BackToMenu from "../../components/BackToMenu";
import { Link } from "react-router-native";
import { FlatList, TouchableWithoutFeedback } from 'react-native'
import { deleteById, getCategoria } from "../../services/categoriasService";
import { useEffect, useState } from "react";
import CategoriaItem from "./CategoriaItem";


export default function Categorias() {

    const [categoryName, setCategoryName] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function fetchCategorias() {
            const categoriasData = await getCategoria();
            if (categoriasData) {
                setCategorias(categoriasData);
            }
        }

        fetchCategorias();
    }, []); // Se ejecutará solo una vez al montar el componente


    const handleDeleteCategoria = async (id) => {
        console.log(id, 'delete');
        await deleteById(id);
        const updatedCategorias = await getCategoria();
        setCategorias(updatedCategorias);
    }

    return (<View>
        <BackToMenu></BackToMenu>
        <Heading>Categorias</Heading>
        <View p={2}>
            <Button rounded borderRadius={2}>
                <Link to="/categorias/agregar" component={TouchableWithoutFeedback}>
                    <Text> Agregar Categoria</Text>
                </Link>
            </Button>
        </View>
        <View>
            <ScrollView>
                {categorias.length > 0 && (
                    <View space={2} mt="5">
                        {categorias.map((categoria) => (
                            <View>
                                   <CategoriaItem title={categoria.nombre} id={categoria.id} onDelete={() => handleDeleteCategoria(categoria.id)}></CategoriaItem>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    </View>)
}