import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Image} from 'react-native';
import SwipeCardComponent from "../components/SwipeCardComponent";
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const HomeScreen = ({navigation}) => {



    const [fireImageOpacity, setFireImageOpacity] = useState(new Animated.Value(0));
    const [cloudImageOpacity, setCloudImageOpacity] = useState(new Animated.Value(0));
    const [products, setProducts] = useState([]);

    const componentDidMount = async () => {
        const options = {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            }
        }

        const response = await fetch(`http://172.20.10.2:8080/products/fetchAll`, options);

        if (response.ok) {
            const data = await response.json();
            await setProducts(data);
        }
        else {
            console.log("non");
        }
    }

    useEffect(() => {
        componentDidMount();
    }, []);


    const updateFireImageOpacity = (opacity) => {
        setFireImageOpacity(opacity);
    };

    const updateCloudImageOpacity = (opacity) => {
        setCloudImageOpacity(opacity);
    };

    const tableImage = [

        require('../assets/0001.png'),
        require('../assets/0002.png'),
        require('../assets/0003.png'),
        require('../assets/0004.png'),
        require('../assets/0005.png'),
        require( '../assets/0006.png'),
        require('../assets/0007.png'),
        require('../assets/0008.png'),
        require('../assets/0009.png'),
        require('../assets/0010.png',)

    ]


    return (


        <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <LinearGradient  colors={['#341782', '#11072C']} style={styles.background}/>
            <Image style={styles.undercard} source={require('../assets/souscarte.png')}/>
            <Animated.Image style={[styles.topImage, { opacity: cloudImageOpacity }]} source={require('../assets/cloud.png')}/>

            {products.map((product, key) => (
                <SwipeCardComponent key={key} product={product}
                                    updateFireImageOpacity={(opacity) => updateFireImageOpacity(opacity)}
                                    updateCloudImageOpacity={(opacity) => updateCloudImageOpacity(opacity)}
                                    backgroundImage={tableImage[key]}
                />
            ))}

            <Animated.Image style={[styles.bottomImage, {opacity: fireImageOpacity}]}
                            source={require('../assets/fire.png')}/>

        </Animated.View>

    );
}

const styles = StyleSheet.create({

    bottomImage: {
        position: 'absolute',
        bottom: 0,
        width: '100%', // Assuming you want the image to span the entire width
        resizeMode: 'cover', // Adjust this based on your image requirements
        zIndex: 2,
    },
    topImage: {
        position: 'absolute',
        top: 0,
        width: '100%', // Assuming you want the image to span the entire width
        resizeMode: 'cover', // Adjust this based on your image requirements
        zIndex: 2,
    },

    background: {
        height:'100%',
        width:'100%',
        position:'relative'
    },

    undercard: {

        position:'absolute',
        height: SCREEN_HEIGHT - 200,
        width: SCREEN_WIDTH - 30,
        resizeMode: 'contain'

    }

})

export default HomeScreen;
