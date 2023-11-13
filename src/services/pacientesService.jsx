import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePersona = async (persona) => {
  const newPersona = {
    id: new Date().getTime().toString(),
    ...persona,
  };

  let personas = await getData();
  if (!personas) {
    personas = [newPersona];
  } else {
    personas.push(newPersona);
  }

  await storeData(personas);
};

export const getPersonas = async () => {
  return await getData();
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('personas', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('personas');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};