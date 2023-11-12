import React, { Children } from "react";
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import StyledText from "../style/StyleText";
import { theme } from "../theme";
import Constants from "expo-constants";
import { Link,useLocation } from "react-router-native";


const AppBarTab = ({ children, to }) => {
    const {pathname} = useLocation();
    const active = pathname === to;
    const textStyle = [
        style.text,
        active && style.active, 
    ];
    return (
        <Link to={to} component={TouchableWithoutFeedback}>
            <StyledText fontWeight='bold' style={textStyle}>
                {children}
            </StyledText>
        </Link>
    )
}


const AppBar = () => {
    return (
        <View style={style.container}>
            <ScrollView horizontal style={style.scroll}>
                <AppBarTab active to='/'>Repositories</AppBarTab>
                <AppBarTab to='/signin'>Sign In</AppBarTab>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: theme.appBar.primary,
        paddingTop: Constants.statusBarHeight + 10,
        flexDirection: 'row',
    },
    text: {
        color: theme.appBar.textSecondary,
        paddingHorizontal: 10,
    },
    scroll:{
        paddingBottom: 10,
    },
    active:{
        color: theme.appBar.textPrimary,
    }
});
export default AppBar;