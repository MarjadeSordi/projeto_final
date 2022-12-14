import styled , { css } from 'styled-components';


export const DivCapsule= styled.div`
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%); 
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;    
min-height: 100vh;  
`

export const TitleCalendar = styled.h3`
color: #f6f4e6;
font-size: 1.2em;
text-transform: uppercase;
font-weight: 500;
padding: 2%;
`


export const Label = styled.label`
color: white; 

`;

export const Small = styled.small`
color: white; 
margin-bottom: 2%;

`;


export const Input = styled.input`
background-color:  #111111;
color: white; 
  margin: 1%;
  width: 20%;
  padding: 8px;
  :: placeholder {
    color: white;
    font-family: 'Roboto', sans-serif;
  }
`;