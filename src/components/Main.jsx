import React from "react";
import { Text, View } from "react-native";
import AppBar from "./AppBar";
import { Route, Navigate, Routes } from 'react-router-native';
import Doctores from "./Doctores";
const Main = () => {
    return (
        <View style={{ flex: 1 }} >
            <AppBar />
            <Routes>
                <Route path='/' element={<Doctores />} />
                <Route path='/signin' element={<Text>Sign In</Text>} />
                <Route path='*' element={<Navigate to='/'/>} />
            </Routes>
        </View>
    );
}

export default Main;