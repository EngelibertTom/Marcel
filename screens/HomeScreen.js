import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import SwipeCardComponent from "../components/SwipeCardComponent";
import { LinearGradient } from 'expo-linear-gradient';



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

    return (


        <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <LinearGradient  colors={['#341782', '#11072C']} style={styles.background}/>
            <Animated.Image style={[styles.topImage, { opacity: cloudImageOpacity }]} source={require('../assets/cloud.png')}/>

            {products.map((product, key) => (
                <SwipeCardComponent key={key} product={product}
                                    updateFireImageOpacity={(opacity) => updateFireImageOpacity(opacity)}
                                    updateCloudImageOpacity={(opacity) => updateCloudImageOpacity(opacity)}/>
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
        width:'100%'
    }

})

export default HomeScreen;
