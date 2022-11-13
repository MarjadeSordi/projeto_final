import styled , { css } from 'styled-components';


export const DivCapsule = styled.div`
color: #f6f4e6;
width: 100%;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
`

export const DivText = styled.div`
margin-top: 5%;
width: 70%;
display: flex;
flex-direction: row; 
justify-content: flex-start; 
align-items: flex-start
margin-top: 20px; 
margin-bottom: 30px; 
`


export const SpanForTitle =styled.span`
font-weight: 400; 
font-size: 14px; 
`

export const InputForText = styled.input`
background-color:  #111111;
color: white; 
  margin: 2%;
  width: 40%;
  padding: 8px;
  :: placeholder {
    color: white;
    font-family: 'Roboto', sans-serif;
  }
`;

export const InputForEmail = styled.input`
background-color:  #111111;
color: white; 
  margin: 2%;

  width: 40%;
  padding: 8px;
  :: placeholder {
    color: white;
    font-family: 'Roboto', sans-serif;
  }
`;

export const InputForPassWord = styled.input`
background-color:  #111111;
color: white; 
  margin: 2%;

  width: 40%;
  padding: 8px;
  :: placeholder {
    color: white;
    font-family: 'Roboto', sans-serif;
  }
  border: ${props => (props.error ? '2px solid #EB5757' : '')};
`
export const SelectedForState = styled.select`
background-color:  #111111;
color: white; 
  margin: 2%;

  width: 40%;
  padding: 8px;

`
export const SelectedForCity = styled.select`
background-color:  #111111;
color: white; 
  margin: 2%;

  width: 40%;
  padding: 8px;
`
export const InputButton = styled.button`
  background-color:  #111111;
  color: white; 
  border: 1px solid #000000;
  margin: 2%;
  width: 40%;
  padding: 8px;
`

export const InputCheckbox = styled.input`
  background-color: transparent;
  border: 1px solid #000000;
  margin: 2%;
  border-radius: 8px;
  padding: 8px;
`

export const FormForClient = styled.form`
 background-color: #363636; 
 width: 70%; 
 margin-bottom: 30px; 
`

export const LabelForCheckbox = styled.label`
color: white`

export const SpanForLink = styled.span`
color: white
margin: 20%`

;

export const DivModal = styled.div`
color: #fff;
width: 100%; 

`

export const ButtonModal = styled.button`
width: 20%; 
margin-top: 10px; 
background-color: transparent; 
color: #FFF;
border: 2px solid rgb(216, 2, 134);
border-radius: 0px;
padding: 10px 10px;
display: inline-block;
font-size: 14px;
letter-spacing: 1px;
cursor: pointer;
box-shadow: inset 0 0 0 0 #D80286;
-webkit-transition: ease-out 0.4s;
-moz-transition: ease-out 0.4s;
transition: ease-out 0.4s;
&:hover {
    box-shadow: inset 400px 0 0 0 #D80286;
}
`