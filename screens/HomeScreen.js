
import React, {useState} from 'react';
import { View, Text, Button, Animated, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwiperComponent from "../components/SwiperComponent";
import SwipeCardComponent from "../components/SwipeCardComponent";

const HomeScreen = ({navigation}) => {

    const [fireImageOpacity, setFireImageOpacity] = useState(new Animated.Value(0));
    const updateFireImageOpacity = (opacity) => {
        setFireImageOpacity(opacity);

    };

    const [cloudImageOpacity, setCloudImageOpacity] = useState(new Animated.Value(0));
    const updateCloudImageOpacity = (opacity) => {
        setCloudImageOpacity(opacity);

    };




    const data = [
        { id: 1, text: 'Card 1', image: require('../assets/icon.png'), ecoScore: 'E'},
        { id: 2, text: 'Card 2', image: require('../assets/favicon.png'), ecoScore: 'A' },
        // ... add more cards as needed
    ];
    return (

        <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Animated.Image style={[styles.topImage, { opacity: cloudImageOpacity }]} source={require('../assets/cloud.png')}/>

            {data.map((card) => (
                <SwipeCardComponent key={card.id} card={card} updateFireImageOpacity={(opacity) => updateFireImageOpacity(opacity)} updateCloudImageOpacity={(opacity) => updateCloudImageOpacity(opacity)} />
            ))}

            <Animated.Image style={[styles.bottomImage, { opacity: fireImageOpacity }]} source={require('../assets/fire.png')}/>

        </Animated.View>

    );
}

const styles = StyleSheet.create({

    bottomImage: {
        position: 'absolute',
        bottom: 0,
        width: '100%', // Assuming you want the image to span the entire width
        resizeMode: 'cover', // Adjust this based on your image requirements
        zIndex:2,
    },
    topImage: {
        position: 'absolute',
        top: 0,
        width: '100%', // Assuming you want the image to span the entire width
        resizeMode: 'cover', // Adjust this based on your image requirements
        zIndex:2,
    },

})

export default HomeScreen;
