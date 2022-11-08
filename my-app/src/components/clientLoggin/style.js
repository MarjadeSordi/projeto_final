import styled from 'styled-components';

export const DivCapsule = styled.div`
color: #f6f4e6;
width: 100%;
height: 100vh;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
`

export const InputForText = styled.input`
  background-color: transparent;
  border: 1px solid #000000;
  margin: 2%;
  border-radius: 8px;
  width: 80%;
  padding: 8px;
  :: placeholder {
    color: #696969;
    font-family: 'Roboto', sans-serif;
  }
`;

export const InputForEmail = styled.input`
background-color:  #111111;
color: white; 
  margin: 4%;
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

export const InputButton = styled.button`
width: 30%; 
margin-top: 30px; 
background-color: transparent; 
color: #FFF;
border: 2px solid rgb(216, 2, 134);
border-radius: 0px;
padding: 18px 36px;
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

export const FormForClient = styled.form`
  background-color: transparent; 
  width: 50%; 
  margin-top: 2%;
  border: 2px solid rgb(216, 2, 134);
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center; 
`

  ;


  export const DivText= styled.div`
    color: #f6f4e6;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 500;
   

`