// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveCategoria = async(value)=>{
    const newCategoria = {
        id: new Date().getTime(),
        nombre:value
    }
    let categorias = await getData();
    if (!categorias) {
        categorias = [newCategoria]
    }else{
        categorias.push(newCategoria);
    }
    // console.log(categorias,"Categorias");
   await storeData(categorias);
}

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('categoria', jsonValue);
    } catch (e) {
        console.log(e);
      // saving error
    }
  };

  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('categoria');
      console.log(jsonValue,'json value');
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e);
    }
  };

  export const getCategoria = async () => {
    return await getData();
  }