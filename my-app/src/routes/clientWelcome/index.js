import React from 'react';
import ImagemFirstPage from '../../components/imagemfirstpage';
import MenuPage from '../../components/menu';
import { BodyPage, ButtonFirstPage, DivTextIntro } from './style';
import {Link} from 'react-router-dom'; 
import {AiOutlineArrowRight} from 'react-icons/ai';

const ClientWelcome = () =>{
    return(
        <> 
        <BodyPage>
        <MenuPage />   
        <DivTextIntro> 
        Conectadas somos mais fortes! 
        <br />
        <br/> 
        <p> Somos um serviço virtual de contato para serviços gerais, que visa a sua segurança. <br />
            Nossas prestadoras credenciadas, e nossas clientes
            <br /> 
             são apenas pessoas que se identificam com o sexo feminino.
        </p>
        <Link to= "/cadastro">
        <ButtonFirstPage> CADASTRE-SE E CONHEÇA <AiOutlineArrowRight /> </ButtonFirstPage>
        </Link>
        </DivTextIntro>
        <ImagemFirstPage /> 
      
        </BodyPage>  
        @Copyright Marja de Sordi
          </>
    )
}

export default ClientWelcome; 