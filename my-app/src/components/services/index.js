import React, { useState, useEffect } from 'react';
import { BoxForService, ButtonSearch, CapsuleForService, 
  CapsuleForBoxes, DivAlignItems, LabelSerchBoxService, SearchBoxService, TextForService ,TitleForService, TitleForServiceTop } from './style';
import { AiOutlineSearch, AiOutlineWhatsApp } from "react-icons/ai";



const Services = () =>{
    const [serviceState, setServiceState] = useState([]);


    const SetServices = async () => {
        let url = 'http://whm.joao1866.c41.integrator.host:9206/usuarios';
        try {
          const responseServices = await fetch(url);
          const jsonService= await responseServices.json();
          jsonService.sort((a, b) => a.nome.localeCompare(b.nome));
          setServiceState(jsonService);
          console.error(serviceState)
        } catch (error) {
          console.error(error);
        }
      };


      let categ = ''
      const TrataCategoria = (categoria) => {
        switch(categoria){
          case 'MANUTENCAO_ELETRICA':
           categ= 'Manutenção elétrica'
           break
          case 'MANUTENCAO_HIDRAULICA':
            categ ='Manutenção Hidraúlica'
          break
          default: categ = ''; 
        }
      }

      let preco = ''
      

      useEffect(() => {
        SetServices();
      }, []);

    return(
        <>
       <CapsuleForService>
      <DivAlignItems>
       <TitleForServiceTop > Serviços </TitleForServiceTop>
       <br />
       <LabelSerchBoxService >
       <SearchBoxService 
       type='search'
       name='serch-service'
       placeholder='Buscar'/>
       <ButtonSearch ><AiOutlineSearch />  </ButtonSearch>
       </LabelSerchBoxService>
       </DivAlignItems>
     
       <CapsuleForBoxes> 
        {serviceState.map((item) =>  
       <BoxForService>
        {(item.categorias).map((categoria) =><>
        <TitleForService>
            {TrataCategoria(categoria.categoria)} 
            {categ}          

         </TitleForService> 
         <TextForService> Valor por hora: {`R$ ${(categoria.valor).toString().replace(".", ",")}0`} </TextForService>
         <br /> 
         </>)}    
         <br />  
         <TextForService> Prestadora: {item.nome}</TextForService>
         {(item.enderecos).map((endereco) =><>
        <TextForService>
            <br /> {endereco.cidade} | {endereco.uf} | {endereco.bairro}
         </TextForService> 
         <TextForService> <br /> <AiOutlineWhatsApp /> {item.phone} </TextForService>
         </>)}    
         <br />  
        
         </BoxForService>)}
    

    
       </CapsuleForBoxes>       
       </CapsuleForService>
       </>
    )
}

export default Services; 