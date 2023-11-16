import React, {useRef, useState, useEffect} from 'react';
import {Animated, Dimensions, PanResponder, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const SwipeCard = ({product, onSwipeComplete, updateFireImageOpacity, updateCloudImageOpacity, backgroundImage}) => {
    // const imageName = product.id;
    // const imagePath = `../assets/${encodeURIComponent(imageName)}`;
    //
    // console.log(imagePath);


    console.log(backgroundImage);



    const navigation = useNavigation();
    const [ecoGuess, setEcoGuess] = useState('');

    const pan = useRef(new Animated.ValueXY()).current;
    const additionalTextOpacity = useRef(new Animated.Value(0)).current;
    const [additionalText, setAdditionalText] = useState('');

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {

            Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(event, gestureState);

            const opacityValue = Math.abs(gestureState.dy) / SCREEN_HEIGHT;

            if (gestureState.dy < 0) {
                setAdditionalText('Paradis');
                setEcoGuess(true);
            } else {
                setAdditionalText('Enfer');
                setEcoGuess(false);
            }

            Animated.timing(additionalTextOpacity, {
                toValue: opacityValue,
                duration: 0,
                useNativeDriver: false,
            }).start();

            if (gestureState.dy > 0) {
                updateFireImageOpacity(additionalTextOpacity);
            } else {
                updateFireImageOpacity(0);
            }

            if (gestureState.dy < 0) {
                updateCloudImageOpacity(additionalTextOpacity)
            } else {
                updateCloudImageOpacity(0)
            }
        },

        onPanResponderRelease: (e, gestureState) => {

            if (Math.abs(gestureState.dy) > 120) {
                Animated.timing(pan,
                    {
                        toValue: {x: 0, y: gestureState.dy > 0 ? SCREEN_HEIGHT : -SCREEN_HEIGHT},
                        duration: 300,
                        useNativeDriver: false,
                    }
                ).start(() => {
                    if (onSwipeComplete) {
                        onSwipeComplete();
                    }
                });

                navigation.navigate('DetailsScreen', {guess: ecoGuess});
            } else {
                Animated.parallel([
                    Animated.spring(pan, {toValue: {x: 0, y: 0}, useNativeDriver: false}),
                    Animated.timing(additionalTextOpacity, {toValue: 0, duration: 200, useNativeDriver: false}),
                ]).start();

                setAdditionalText('');
            }
            updateFireImageOpacity(0);
            updateCloudImageOpacity(0)

        },
    });

    return (
            <Animated.View {...panResponder.panHandlers}  style={[styles.card, { transform: [{ translateY: pan.y }] }]}>

                <Image style={styles.image} source={backgroundImage}></Image>

                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.categories}>{product.categories.map(category => `${category}, `)}</Text>

            </Animated.View>





    );
};

const styles = StyleSheet.create({
    card: {
        height: SCREEN_HEIGHT - 220,
        width: SCREEN_WIDTH - 60,
        backgroundColor: '#8C52FF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        zIndex: 1,
    },

    image: {
        width: 250,
        height: 250,
        alignSelf: 'center',

        resizeMode:'contain'

    },

    name: {
        color: 'white',
        fontFamily:'Poppins-Regular',
        fontWeight: 'bold',
        fontSize:24,
        alignSelf: 'flex-start',
        paddingLeft:15,
        marginTop:25,
    },

    categories: {
        fontFamily:'Poppins-Regular',
        color: 'white',
        paddingLeft:15,
        paddingRight:15,
        alignSelf: 'flex-start',
        marginTop:15,
    }
});

export default SwipeCard;
