import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveReservaTurnos = async (reserva) => {
  const newReserva = {
    id: new Date().getTime().toString(),
    ...reserva,
  };

  let reservas = await getData();
  if (!reservas) {
    reservas = [newReserva];
  } else {
    reservas.push(newReserva);
  }
  await storeData(reservas);
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reservas', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getReservas = async () => await getData();

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('reservas');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};