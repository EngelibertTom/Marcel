import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

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
            <Text>{resultTitle}</Text>
        </View>
    );
}

export default DetailsScreen;
