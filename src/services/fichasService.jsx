// fichasService.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFichaClinica = async (value) => {
    const newFicha = {
        id: new Date().getTime(),
        ...value
    };
    let fichasClinicas = await getFichasClinicasData();
    if (!fichasClinicas) {
        fichasClinicas = [newFicha];
    } else {
        fichasClinicas.push(newFicha);
    }
    await storeFichasClinicasData(fichasClinicas);
};

const storeFichasClinicasData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('fichaClinica', jsonValue);
    } catch (e) {
        console.log(e);
    }
};

export const getFichasClinicasData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('fichaClinica');
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e);
    }
};

export const getFichaClinicaById = async (id) => {
    try {
        const fichasClinicas = await getFichasClinicasData();
        const fichaClinica = fichasClinicas.find(ficha => ficha.id === id);
        return fichaClinica || {};
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const editFichaClinica = async (editedFicha) => {
    try {
        let fichasClinicas = await getFichasClinicasData();
        if (fichasClinicas) {
            const index = fichasClinicas.findIndex(ficha => ficha.id === editedFicha.id);
            if (index !== -1) {
                fichasClinicas[index] = editedFicha;
                await storeFichasClinicasData(fichasClinicas);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};
