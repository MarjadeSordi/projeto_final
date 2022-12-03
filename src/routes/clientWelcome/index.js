import React, { useState, useEffect }  from 'react';
import ImagemFirstPage from '../../components/imagemfirstpage';
import MenuPage from '../../components/menu';
import { BodyPage, BoxForService, ButtonFirstPage, CapsuleForBoxes, DivTextIntro, TextForService, TitleForService } from './style';
import {Link} from 'react-router-dom'; 
import {AiOutlineArrowRight} from 'react-icons/ai';
import { useUserContext } from "../../context/userContext";


const ClientWelcome = () =>{
    const { user } = useUserContext();

    
  useEffect(() => {
    if (user && user.displayName) {
      console.log("useEffect user" + user.displayName);
    } else (console.log('error'))
  }, [user]);

    return(
        <> 
        <BodyPage>
        <MenuPage />   
        <DivTextIntro> 
        Conectadas somos mais fortes! 
        {user? <> 
        
            <CapsuleForBoxes>
                <BoxForService> 
            <TitleForService> MINHAS SOLICITAÇÕES:</TitleForService>
           <TextForService>Data:   </TextForService> <br/>
            <TextForService>Serviço:  </TextForService><br/>
            <TextForService>Prestadora:  </TextForService><br/>
           <TextForService> Status: </TextForService><br/>
        </BoxForService>
            </CapsuleForBoxes>

        </> :   <> 
        <br />
        <br/> 
        <p> Somos um serviço virtual de contato para serviços gerais, que visa a sua segurança. <br />
            Nossas prestadoras credenciadas, e nossas clientes
            <br /> 
             são apenas pessoas que se identificam com o sexo feminino.
        </p>
        <Link to= "/cadastro">
        <ButtonFirstPage> CADASTRE-SE E CONHEÇA <AiOutlineArrowRight /> </ButtonFirstPage>
        </Link></>}
  
        </DivTextIntro>
        <ImagemFirstPage /> 
         
         </BodyPage>  
     
          </>
    )
}

export default ClientWelcome; 