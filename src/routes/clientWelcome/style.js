import styled from 'styled-components';

export const BodyPage = styled.div` 
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
min-height: 100%; 
display: flex;
width: 100%; 
flex-direction: row;

`

export const DivTextIntro = styled.div`
    color: #f6f4e6;
    font-weight: 500;
    margin-top: 5%;
    width: 50%;
    p {
        margin-left: 5%;
        text-transform: uppercase; 
    }

`

export const ButtonFirstPage = styled.button`
margin-top: 30px; 
margin-left: 20%;
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
export const BoxForService = styled.div`
color: #f6f4e6;
width: 100%;
border: 2px solid rgb(216, 2, 134);
margin: 10px;
padding: 5px;
border-radius: 0px; 

`

export const CapsuleForBoxes = styled.div`
display: flex;
margin-top: 20px;
flex-direction: row;
padding: 10px; 
width: 100%; 
flex-wrap: wrap;
`

export const TitleForService = styled.h3`
font-weight: 600;
color: #f6f4e6;
margin-left: 20%; 
text-transform: uppercase;
`

export const TextForService = styled.span`
font-weight: 300;
`

export const TextForTitle = styled.span`
text-transform: uppecase;
font-weight: 500;
margin-left: 2%;
`

export const ButtonModal = styled.button`
width: 30%; 
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

export const InputForComent = styled.textarea`
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

export const ModalText = styled.div`
margin-left: 10px; 
color: #f6f4e6;
font-size: 1.2em;
font-weight: 300;`

export const ButtonM= styled.button`
background-color: transparent; 
color: #FFF;
border: none;
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


export const ModalCapsule = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center; `