import styled from "styled-components";


const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
`

const DynamicImage = (props) => {

    return (
        <>
            {
                props.image === "mad-marcel-1" &&
                <StyledImage source={require("../assets/mad-marcel-1.png")}/>
            }
            {
                props.image === "mad-marcel-2" &&
                <StyledImage source={require("../assets/mad-marcel-2.png")}/>
            }
            {
                props.image === "mad-marcel-3" &&
                <StyledImage source={require("../assets/mad-marcel-3.png")}/>
            }
            {
                props.image === "mad-marcel-4" &&
                <StyledImage source={require("../assets/mad-marcel-4.png")}/>
            }
            {
                props.image === "good-marcel-1" &&
                <StyledImage source={require("../assets/good-marcel-1.png")}/>
            }
            {
                props.image === "good-marcel-2" &&
                <StyledImage source={require("../assets/good-marcel-2.png")}/>
            }
            {
                props.image === "good-marcel-3" &&
                <StyledImage source={require("../assets/good-marcel-3.png")}/>
            }
            {
                props.image === "good-marcel-4" &&
                <StyledImage source={require("../assets/good-marcel-4.png")}/>
            }
        </>
    );

}

export default DynamicImage;