import { ArrowForwardIcon, Text, Flex, View, Button } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'
import { deleteById } from '../../services/categoriasService'

export default function CategoriaItem({ title, id, onDelete }) {

    // const eliminarCategoria = ()=>{
    //     console.log(id,"id")
    //     deleteById(id);
    // }
    const eliminarCategoria = () => {
        if (onDelete) {
            console.log('deleyte');
            onDelete(id);
        }
    }

    return (<View mt={1}>
        <Flex
            p={2}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            borderWidth={1}
            borderRadius={10}
            borderColor='gray.300'
        >
            <Text>{title}</Text>
            <Flex>
                <Button mb={1} size='xs'>
                <Link to={"/categorias/editar/"+id} component={TouchableWithoutFeedback}>
                    <Text> Editar</Text>
                </Link>                
                </Button>
                <Button colorScheme='danger' size="xs" onPress={eliminarCategoria}>Eliminar</Button>
            </Flex>
            {/* <View> <Button>Hola</Button></View> */}
        </Flex>
    </View>)

}