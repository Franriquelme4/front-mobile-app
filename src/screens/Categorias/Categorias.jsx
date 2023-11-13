import { Button, View, Heading, Text } from "native-base";
import BackToMenu from "../../components/BackToMenu";
import { Link } from "react-router-native";
import { TouchableWithoutFeedback } from 'react-native'

export default function Categorias() {
    return <View>
        <BackToMenu></BackToMenu>
        <Heading>Categorias</Heading>
        <View p={2}>
                <Button rounded borderRadius={2}>
            <Link to="/categorias/agregar" component={TouchableWithoutFeedback}>
                   <Text> Agregar Categoria</Text>
            </Link>
                </Button>
        </View>
    </View>
}