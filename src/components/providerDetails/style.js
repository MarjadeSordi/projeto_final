import styled from "styled-components";


export const ProfileCapsule =styled.div`
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%)
width: 100%;
margin: 0px; 
`


export const ProfileBox = styled.div`
margin-top: 5%; 
display: flex; 
border: 2px solid rgb(216, 2, 134);
width: 50%;
`

export const ProfileText = styled.div`
margin-left: 10px; 
color: #f6f4e6;
font-size: 1.2em;
text-transform: uppercase;
font-weight: 300;`

export const ImageSelfie = styled.img`
width: 30%; `

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
