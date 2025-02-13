import React from "react";
import { SafeAreaView } from "react-native";
import { Route, Navigate, Routes, Switch } from 'react-router-native';
import Categorias from "./src/screens/Categorias/Categorias";
import Home from "./src/screens/Home";
import { View } from "native-base";
import Pacientes from "./src/screens/Pacientes/Pacientes";
import Doctores from "./src/screens/Doctores";
import ReservaDeTurnos from "./src/screens/ReservaDeTurnos/ReservaDeTurnos";
import CategoriaNew from "./src/screens/Categorias/CategoriaNew";
import CategoriaEditar from "./src/screens/Categorias/CategoriaEditar";
import PacienteNew from "./src/screens/Pacientes/PacienteNew";
import FichasClinicas from "./src/screens/Fichas/Fichas";
import FichasClinicasNew from "./src/screens/Fichas/FichasNew";
import ReservasDeTurnosNew from "./src/screens/ReservaDeTurnos/ReservaDeTurnosNew";

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
                    <Route path="/pacientes/agregar" element={<PacienteNew />} />
                    <Route path='/doctores' element={<Doctores />} />
                    <Route path='/reserva-turnos' element={<ReservaDeTurnos />} />
                    <Route path="/fichas-clinicas" element={<FichasClinicas />} />
                    <Route path='/fichas-clinicas/agregar' element={<FichasClinicasNew />} />
                    <Route path='*' element={<Navigate to='/' />} />
                    <Route path='/reserva-turnos/agregar' element={<ReservasDeTurnosNew />} />
                    <Route path='*' element={<Navigate to='/'/>} />
                </Routes>
            </View>
        </SafeAreaView>
    );
}

export default Main;