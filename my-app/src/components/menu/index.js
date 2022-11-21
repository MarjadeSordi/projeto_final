import React, { useState, useEffect }  from 'react';
import { NavBarMenu, MenuText, MenuOla } from './style';
import { Link } from 'react-router-dom';
import { useUserContext } from "../../context/userContext";


const MenuPage = () =>{
  const { user, serverUser } = useUserContext();

  useEffect(() => {
      if (user) {
        console.log("useEffect user" + user.displayName);
      } else (console.log('error'))
    }, [user]);

    return(
        <NavBarMenu>
         <MenuOla>{user? `Bem vinda ${user.displayName}!`: ''} </MenuOla>		
        <Link to='/'>  <MenuText> HOME </MenuText></Link>
        <Link to='/login'>  <MenuText> LOGIN </MenuText></Link>
        <Link to='/cadastro'>  <MenuText> CADASTRO </MenuText> </Link>
        <Link to='/dashboard'>   <MenuText> SERVIÇOS  </MenuText></Link>
          <MenuText> FALE CONOSCO </MenuText>
        </NavBarMenu>
    )
}

export default MenuPage; 