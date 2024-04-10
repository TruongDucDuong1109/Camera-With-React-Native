import * as React from "react";
import {  Text , TouchableOpacity, StyleSheet } from "react-native";
import {Entypo} from "@expo/vector-icons";

export default function Button({title, onPress, icon, color}) {
    return (
        <TouchableOpacity onPress={onPress} style = {styles.button}>
            <Entypo name={icon} size={24} color={color ? color: '#f1f1f1'} />
            <Text style= {styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: "row",
        alignItemsc: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f1f1f1",
        marginLeft: 10,
    }
})