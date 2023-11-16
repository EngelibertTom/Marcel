import {useEffect, useState} from "react";
import styled from "styled-components";
import DynamicImage from "../DynamicImage";

const ComponentView = styled.View`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MarcelText = styled.Text`
  border: 2px black solid;
  font-family: Poppins-Regular;
  font-size: 16px;
  color: white;
`;

const StyledView = styled.View`
  width: 50%;
  height: 100%;
`;

const MarcelView = (props) => {

    const [dialog, setDialog] = useState({});
    const [marcel, setMarcel] = useState("");

    const componentDidMount = async () => {
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dialogType: props.goodGuess ? "GOOD" : "BAD"
            })
        }

        const response = await fetch(`http://172.20.10.2:8080/marcelDialogs/fetch`, options);

        if (response.ok) {
            const data = await response.json();

            setDialog(data[Math.floor(Math.random() * data.length)]);

            if (data[0].associatedMarcelDesignName === "mad-marcel") {
                setMarcel(`mad-marcel-${Math.floor(Math.random() * 4) + 1}`);
            } else if (data[0].associatedMarcelDesignName === "kind-marcel") {
                setMarcel(`good-marcel-${Math.floor(Math.random() * 4) + 1}`);
            } else {
                setMarcel(`neutral-marcel-${Math.floor(Math.random() * 2) + 1}`);
            }
        }
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <ComponentView>
            <StyledView>
                <DynamicImage image={marcel}/>
            </StyledView>
            <StyledView>
                <MarcelText>{dialog.text}</MarcelText>
            </StyledView>
        </ComponentView>
    );
}

export default MarcelView;