import styled from 'styled-components';

export const CapsuleForService = styled.div`
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%)
width: 100%;
height: 100vh;
`

export const CapsuleForBoxes = styled.div`
display: flex;
margin-top: 20px;
flex-direction: row;
padding: 10px; 
width: 100%; 
flex-wrap: wrap;
`


export const BoxForService = styled.div`
color: #f6f4e6;
width: 30%;
border: 2px solid rgb(216, 2, 134);
margin: 10px;
padding: 5px;
border-radius: 0px; 

`

export const TitleForService = styled.h2`
font-weight: 600;
color: #f6f4e6;
`

export const TitleForServiceTop = styled.h1`
margin-top: 4%; 
color: #f6f4e6;
text-transform: uppercase;
font-weight: 500;
`

export const DivAlignItems = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center`

export const TextForService = styled.span`
font-weight: 300;
`


export const SearchBoxService = styled.input`
background-color: transparent;
color: black; 
height: 30px; 
width:90%;
border-radius: 4px;
`
export const LabelSerchBoxService = styled.div `
background-color: transparent;
color: black; 
width: 50%;
display:flex; 
border-radius: 4px;
align-items: center;`

export const ButtonSearch = styled.button`
background-color: transparent;
width: 8%;
border: transparent; 
color:black; 
font-size: 20px; 
`