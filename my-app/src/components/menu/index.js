import React from 'react';
import { NavBarMenu, MenuText } from './style';
import { Link } from 'react-router-dom';

const MenuPage = () =>{
    return(
        <NavBarMenu>
             <Link to='/'>  <MenuText> HOME </MenuText></Link>
        <Link to='/login'>  <MenuText> LOGIN </MenuText></Link>
        <Link to='/cadastro'>  <MenuText> CADASTRO </MenuText> </Link>
        <Link to='/dashboard'>   <MenuText> SERVIÇOS  </MenuText></Link>
          <MenuText> FALE CONOSCO </MenuText>
        </NavBarMenu>
    )
}

export default MenuPage; 