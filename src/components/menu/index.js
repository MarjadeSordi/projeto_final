import React, { useState, useEffect }  from 'react';
import {InputButton, NavBarMenu, MenuText, MenuOla } from './style';
import { Link } from 'react-router-dom';
import { useUserContext } from "../../context/userContext";


const MenuPage = () =>{
  const { user, logoutUser } = useUserContext();

  const handleLogout = () => {
    logoutUser();
  }

  useEffect(() => {
      if (user && user.displayName) {
        console.log("useEffect user " + user.email);
      }
        else (console.log('error'))
    }, [user]);

    return(
        <NavBarMenu>
         <MenuOla>{user && user.displayName? `Bem vinda ${user.displayName}!`: ''} </MenuOla>		
        <Link to='/'>  <MenuText> HOME </MenuText></Link>
        {user?  '' : <Link to='/login'>  <MenuText> LOGIN </MenuText></Link> }
        <Link to='/cadastro'>  <MenuText> {user? 'EDITAR CADASTRO' : 'CADASTRO'} </MenuText> </Link>
        <Link to='/dashboard'>   <MenuText> SERVIÇOS  </MenuText></Link>
        <Link to='/faleconosco'>   <MenuText> FALE CONOSCO  </MenuText></Link>
        {user?          <InputButton
        type="button"
        value="LOGOUT"
        onClick={handleLogout}> LOGOUT
           </InputButton>  : ''}
        </NavBarMenu>
    )
}

export default MenuPage; 