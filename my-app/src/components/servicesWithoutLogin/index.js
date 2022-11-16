import React, { useState, useEffect } from 'react';
import { auth } from "../../context/firebase";
import {  CapsuleForService,  TitleForServiceTop } from './style';
import { AiOutlineSearch, AiOutlineWhatsApp } from "react-icons/ai";
import MenuPage from '../menu';



const Services = () =>{

    return(
        <>
       <CapsuleForService>
        <MenuPage /> 
     
       <TitleForServiceTop > Você precisa estar logada para acessar esse serviço </TitleForServiceTop>
       <br />
            
       </CapsuleForService>
       </>
    )
}

export default Services; 