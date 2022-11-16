import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  CapsuleForService,  TitleForServiceTop, DivAlignItems, DivText, ImgNot} from './style';
import MenuPage from '../menu';
import naoEntre from '../../assets/naoentre.png'


const ServicesWithoutLogin = () =>{

    return(
       
       <CapsuleForService>
        <MenuPage /> 
        <DivAlignItems>
            <ImgNot src={naoEntre} />
       <TitleForServiceTop > Você precisa estar logada para acessar esse serviço </TitleForServiceTop>
       <br />
       
       <DivText> 

          <Link to='/login' style={{ textDecoration: 'none', color: '#FFF' }} > Quero fazer o meu login! </Link>
          <br/> 
          <br/> 
          <Link to='/cadastro' style={{ textDecoration: 'none',  color: '#FFF' }}> Quero fazer o meu cadastro! </Link> </DivText>
          </DivAlignItems>
       
       </CapsuleForService>
       
    )
}

export default ServicesWithoutLogin; 