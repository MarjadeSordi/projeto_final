import styled from 'styled-components';


export const NavBarMenu = styled.nav`
position: absolute;
top: 2%;
width: 80%;
display: flex;
flex-direction: row;
justify-content:space-between;
left: 2%;
`

export const MenuText= styled.span`
color: #f6f4e6;
font-size: 1em;
text-transform: uppercase;
font-weight: 500;
display: inline-block;

`


export const MenuOla= styled.span`
color: rgb(216, 2, 134);
font-size: 1.2em;
font-weight: 500;
display: inline-block;
`

export const InputButton = styled.button`
background-color: transparent; 
color: rgb(216, 2, 134);
font-size: 1.2em;
text-transform: uppercase;
font-weight: 600;
border: none;
border-radius: 0px;
display: inline-block;
font-size: 14px;
letter-spacing: 1px;
cursor: pointer;
box-shadow: inset 0 0 0 0 #f6f4e6;
-webkit-transition: ease-out 0.4s;
-moz-transition: ease-out 0.4s;
transition: ease-out 0.4s;
&:hover {
    box-shadow: inset 400px 0 0 0 #f6f4e6;
}
`