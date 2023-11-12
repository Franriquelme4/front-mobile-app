import React from "react";
import { SafeAreaView } from "react-native";
import { Route, Navigate, Routes } from 'react-router-native';
import Categorias from "./src/screens/Categorias";
import Home from "./src/screens/Home";
import { View } from "native-base";

const Main = () => {
    return (
        <SafeAreaView>
            <View px={5}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/categorias' element={<Categorias />} />
                    <Route path='*' element={<Navigate to='/'/>} />
                </Routes>
            </View>
        </SafeAreaView>
    );
}

export default Main;