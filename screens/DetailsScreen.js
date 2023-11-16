import React, {useEffect, useState} from 'react';
import ResultTitle from "../components/detailsScreen/ResultTitle";
import {LinearGradient} from "expo-linear-gradient";
import MarcelView from "../components/detailsScreen/MarcelView";
import styled from "styled-components";

const ComponentView = styled.View`
  width: 100%;
  height: 100%;
`;

const DetailsScreen = ({route}) => {

    const {ecoGuess, product} = {...route.params};
    const [goodGuess, setGoodGuess] = useState(false);

    useEffect(() => {
        if (
            (ecoGuess === "Paradis" && product.isEco) ||
            (ecoGuess === "Enfer" && !product.isEco)
        ) {
            setGoodGuess(true);
        }
    }, []);

    return (
        <LinearGradient colors={['#341782', '#11072C']} style={{width: "100%", height: "100%"}}>
            <ComponentView>
                <ResultTitle goodGuess={goodGuess}/>

                <MarcelView goodGuess={goodGuess}/>
            </ComponentView>
        </LinearGradient>
    );
}

export default DetailsScreen;
