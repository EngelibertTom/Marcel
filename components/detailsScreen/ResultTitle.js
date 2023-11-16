import React from 'react';
import styled from "styled-components";

const ComponentView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 2;
  height: 25%;
`;

const StyledTitle = styled.Text`
  margin: 0;
  padding: 0;
  font-size: 64px;
  font-family: 'Bangers-Regular';
  color: white;
`;

const ResultTitle = (props) => {
    return (
        <ComponentView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <StyledTitle>
                {
                    props.goodGuess ? "Gagné!!!" : "Raté..."
                }
            </StyledTitle>
        </ComponentView>
    );
}

export default ResultTitle;