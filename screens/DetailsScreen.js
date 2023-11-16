import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import "styled-components/native"

const DetailsScreen = ({ route }) => {
    // Déclarez resultBun en dehors de useEffect
    const resultBun = route.params;

    useEffect(() => {
        console.log(resultBun);
    }, [resultBun]);

    let resultTitle = "";

    if (resultBun === true) {
        resultTitle = "Gagné !!!";
    } else {
        resultTitle = "Raté...";
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.result}>{resultTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    result: {

        fontFamily:'Bangers-Regular'

    }

})

export default DetailsScreen;
