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

export const editarPersona = async (persona) => {
  let personas = await getPersonas();
  if (!personas) {
    return; // No hay personas para editar
  }

  const index = personas.findIndex((p) => p.id === persona.id);
  if (index !== -1) {
    personas[index] = persona;
    await storeData(personas);
  }
};

export const eliminarPersona = async (id) => {
  let personas = await getPersonas();
  if (!personas) {
    return; 
  }

  personas = personas.filter((p) => p.id !== id);
  await storeData(personas);
};
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('personas');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};