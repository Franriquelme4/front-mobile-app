import React from "react";
import { View } from "react-native";
import { Route, Navigate, Routes } from 'react-router-native';
import Categorias from "./src/screens/Categorias";
import Home from "./src/screens/Home";

const Main = () => {
    return (
        <View style={{ flex: 1, padding: 30 }} >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/categorias' element={<Categorias />} />
                <Route path='*' element={<Navigate to='/'/>} />
            </Routes>
        </View>
    );
}

export default Main;