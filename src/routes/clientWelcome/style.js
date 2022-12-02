import styled from 'styled-components';

export const BodyPage = styled.div` 
background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);
`

export const DivTextIntro = styled.div`
    color: #f6f4e6;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 500;
    margin-left: 50%;
    position: absolute;
    right: 20%;
    top: 30%;

`

export const ButtonFirstPage = styled.button`
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
`

export const TextForService = styled.span`
font-weight: 300;
`