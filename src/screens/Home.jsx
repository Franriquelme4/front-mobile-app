import { ArrowForwardIcon, Heading, Text, View, Flex } from 'native-base'
import { TouchableNativeFeedback } from 'react-native'
import { Link } from 'react-router-native'

export default function Home(){
    return <View>
        <Heading>Menu</Heading>
        <View mt={3}>
            <Link to='/categorias' component={TouchableNativeFeedback}>
                <Flex 
                    p={2}
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    borderWidth={1}
                    borderRadius={10}
                    borderColor='gray.300'
                    
                >
                    <Text>Doctores</Text>
                    <ArrowForwardIcon />
                </Flex>
            </Link>
        </View>
    </View>
}