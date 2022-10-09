import styled , { css } from 'styled-components';


export const DivCapsule = styled.div`
width: 100%;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
`

export const DivText = styled.div`
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
 box-shadow: 10px 10px 5px lightgrey;
 margin-bottom: 30px; 
`

export const LabelForCheckbox = styled.label`
color: white`

export const SpanForLink = styled.span`
color: white
margin: 20%`

;