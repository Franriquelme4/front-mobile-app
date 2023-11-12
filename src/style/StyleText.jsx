import React from "react";
import { Text, StyleSheet } from "react-native";
import { theme } from "../theme";
const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: theme.colors.textPrimary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    bold: {
        fontWeight: theme.fontWeights.bold,
    },
    subHeading: {
        fontSize: theme.fontSizes.subheading,
    },
    textAlingCenter:{
        textAlign:"center"
    }
});

export default function StyledText({ children,color,fontSize,fontWeight,style,...restofProps }) {
    const textStyles = [
        styles.text,
        color === "primary" && styles.colorPrimary,
        color === "secondary" && styles.colorSecondary,
        fontWeight === "bold" && styles.bold,
        fontSize === "subheading" && styles.subHeading,
        style
    ];
    return (
        <Text style={textStyles} {...restofProps}>
            {children}
        </Text>
    )
};

