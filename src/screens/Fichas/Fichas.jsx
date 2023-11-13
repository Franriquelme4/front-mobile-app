import { Button, View, Heading, ScrollView } from "native-base";
import BackToMenu from "../../components/BackToMenu";
import { useNavigate } from "react-router-native";
import { deleteFichaClinica, getFichasClinicas } from "../../services/fichasService";
import { useEffect, useState } from "react";
import FichaClinicaItem from "./FichaClinicaItem";

export default function FichasClinicas() {
    const [fichasClinicas, setFichasClinicas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFichasClinicas() {
            const fichasData = await getFichasClinicas();
            if (fichasData) {
                setFichasClinicas(fichasData);
            }
        }

        fetchFichasClinicas();
    }, []);

    const handleDeleteFichaClinica = async (id) => {
        await deleteFichaClinica(id);
        const updatedFichas = await getFichasClinicas();
        setFichasClinicas(updatedFichas);
    };

    return (
        <View>
            <BackToMenu />
            <Heading>Fichas Clínicas</Heading>
            <View p={2}>
                <Button rounded borderRadius={2} onPress={() => navigate('/fichas-clinicas/agregar')}>
                    Agregar Ficha Clinica
                </Button>
            </View>
            <ScrollView>
                {fichasClinicas.length > 0 && (
                    <View space={2} mt="5">
                        {fichasClinicas.map((ficha) => (
                            <FichaClinicaItem
                                key={ficha.id}
                                ficha={ficha}
                                onDelete={() => handleDeleteFichaClinica(ficha.id)}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
