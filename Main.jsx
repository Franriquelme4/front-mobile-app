import React from "react";
import { SafeAreaView } from "react-native";
import { Route, Navigate, Routes } from 'react-router-native';
import Categorias from "./src/screens/Categorias/Categorias";
import Home from "./src/screens/Home";
import { View } from "native-base";
import Pacientes from "./src/screens/Pacientes";
import Doctores from "./src/screens/Doctores";
import ReservaDeTurnos from "./src/screens/ReservaDeTurnos";
import CategoriaNew from "./src/screens/Categorias/CategoriaNew";
import CategoriaEditar from "./src/screens/Categorias/CategoriaEditar";

const Main = () => {
    return (
        <SafeAreaView>
            <View px={5}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/categorias' element={<Categorias />} />
                    <Route path='/categorias/agregar' element={<CategoriaNew />} />
                    <Route path='/categorias/editar/:id' element={<CategoriaEditar />} />
                    <Route path='/pacientes' element={<Pacientes />} />
                    <Route path='/doctores' element={<Doctores />} />
                    <Route path='/reserva-turnos' element={<ReservaDeTurnos />} />
                    <Route path='*' element={<Navigate to='/'/>} />
                </Routes>
            </View>
        </SafeAreaView>
    );
}

export default Main;