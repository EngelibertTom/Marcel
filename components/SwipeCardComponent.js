import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, PanResponder, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const SwipeCard = ({ card, onSwipeComplete, updateFireImageOpacity, updateCloudImageOpacity }) => {



    const navigation = useNavigation();
    const [ecoGuess, setEcoGuess] = useState('');
    const [resultBun, setResultBun] = useState(null);

    const pan = useRef(new Animated.ValueXY()).current;
    const additionalTextOpacity = useRef(new Animated.Value(0)).current; // Opacité pour le texte supplémentaire
    const [additionalText, setAdditionalText] = useState('');

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {

            Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(event, gestureState);

            const opacityValue = Math.abs(gestureState.dy) / SCREEN_HEIGHT;
            // Set additional text based on the direction of the swipe
            if (gestureState.dy < 0) {
                setAdditionalText('Paradis');
                setEcoGuess("Paradis")

            } else {
                setAdditionalText('Enfer');
                setEcoGuess("Enfer")

            }

            console.log(ecoGuess);
            // Gérer l'opacité du texte supplémentaire

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
                // Si le swipe est suffisamment grand, déclenchez l'animation de disparition de la carte
                Animated.timing(pan, {
                    toValue: { x: 0, y: gestureState.dy > 0 ? SCREEN_HEIGHT : -SCREEN_HEIGHT },
                    duration: 300,
                    useNativeDriver: false,
                }).start(() => {
                    // Appeler la fonction de callback lorsque l'animation est terminée
                    if (onSwipeComplete) {
                        onSwipeComplete();
                    }
                });

// Vérification que le choix fait par l'utilisateur est bien correct selon l'éco score du produit

                if (ecoGuess === "Paradis") {
                    console.log(card.ecoScore);
                    if (card.ecoScore === "A" || card.ecoScore === "B" || card.ecoScore === "C") {
                        console.log("Tu as raison, c'est bien écolo et donc paradis!");
                       setResultBun(true)
                        navigation.navigate('DetailsScreen', true);

                    } else {

                        setResultBun(false)
                        navigation.navigate('DetailsScreen', false);
                    }

                }

                if (ecoGuess === "Enfer") {
                    if (card.ecoScore === "D" || card.ecoScore === "E" || card.ecoScore === "F") {
                        console.log("Tu as raison, c'est bien de la merde et donc enfer!");
                        setResultBun(false)
                        navigation.navigate('DetailsScreen', true);
                    } else {
                        console.log("Tu as tort!");
                        setResultBun(true)
                        navigation.navigate('DetailsScreen', false);
                    }

                }



            }


            else {
                // Si le swipe n'est pas suffisamment grand, revenez à la position initiale
                Animated.parallel([
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }),
                    Animated.timing(additionalTextOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
                ]).start();
                setAdditionalText('');
            }
        },
    });

    return (

            <Animated.View {...panResponder.panHandlers}  style={[styles.card, { transform: [{ translateY: pan.y }] }]}>


                <Text>{card.text}</Text>
                <Animated.Text style={{ opacity: additionalTextOpacity }}>{additionalText}</Animated.Text>

            </Animated.View>





    );
};

const styles = StyleSheet.create({
    card: {
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        backgroundColor: '#9a9898',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        zIndex:1,
    },

    image: {
        width: '100%',
        height: 'auto',
    },
});

export default SwipeCard;
