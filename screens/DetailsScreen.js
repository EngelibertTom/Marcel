import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen = ({ route }) => {
    // Déclarez resultBun en dehors de useEffect
    const resultBun = route.params;

    useEffect(() => {
        console.log(resultBun.guess);
    }, [resultBun]);

    let resultTitle = "";

    if (resultBun.guess === true) {
        resultTitle = "Gagné !!!";
    } else {
        resultTitle = "Raté...";
    }

    return (
        <LinearGradient  colors={['#341782', '#11072C']} style={styles.background}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <Text style={styles.result}>{resultTitle}</Text>

        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    result: {

        fontFamily:'Bangers-Regular',
        color:'white',
        fontSize: 30

    },

    background: {
        height:'100%',
        width:'100%',

    }

})

export default DetailsScreen;
