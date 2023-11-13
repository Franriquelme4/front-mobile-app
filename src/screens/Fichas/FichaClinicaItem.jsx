import { Text, Flex, View, Button } from 'native-base';
import { useNavigate } from 'react-router-native';

export default function FichaClinicaItem({ ficha, onDelete }) {
    const navigate = useNavigate();

    const eliminarFichaClinica = () => {
        if (onDelete) {
            onDelete(ficha.id);
        }
    }

    return (
        <View mt={1}>
            <Flex
                p={2}
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                borderWidth={1}
                borderRadius={10}
                borderColor='gray.300'
            >
                <Text>{`Ficha de ${ ficha.paciente.nombre } - ${ ficha.doctor.nombre }`}</Text>
                <Flex>
                    <Button colorScheme='danger' size="xs" onPress={eliminarFichaClinica}>
                        Eliminar
                    </Button>
                </Flex>
            </Flex>
        </View>
    );
}
