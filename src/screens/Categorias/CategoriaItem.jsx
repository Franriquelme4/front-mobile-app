import { ArrowForwardIcon, Text, Flex, View, Button } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'
import { Link } from 'react-router-native'

export default function CategoriaItem({ title }) {
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
                <Button mb={1} size='xs'>Editar</Button>
                <Button colorScheme='danger' size="xs">Eliminar</Button>
            </Flex>


            {/* <View> <Button>Hola</Button></View> */}

        </Flex>
    </View>)

}