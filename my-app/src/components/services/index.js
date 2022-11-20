import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../../context/firebase";
import { BoxForService, ButtonSearch, CapsuleForService, 
  CapsuleForBoxes, DivAlignItems, LabelSerchBoxService, SearchBoxService, TextForService ,TitleForService, TitleForServiceTop } from './style';
import { AiOutlineSearch, AiOutlineWhatsApp } from "react-icons/ai";
import MenuPage from '../menu';
import { Link } from 'react-router-dom';


const Services = () =>{
    const [serviceState, setServiceState] = useState([]);
    const [value, setValue] =  useState();

    function setFilter(e) {
      e.preventDefault();
      setValue(e.target.value);
    }

    async function SetServices() {
    let url = 'http://whm.joao1866.c41.integrator.host:9206/usuarios?tipo=PRESTADOR';
    try {
      const responseServices = await fetch(url);
      const jsonService = await responseServices.json();
      jsonService.filter((item) => item.categorias);
      jsonService.sort((a, b) => a.nome.localeCompare(b.nome));
      setServiceState(jsonService);
      console.error(serviceState);
    } catch (error) {
      console.error(error);
    }
  }


      let categ = ''
      const TrataCategoria = (categoria) => {
        switch(categoria){
          case 'MANUTENCAO_ELETRICA':
           categ= 'Manutenção elétrica'
           break
          case 'MANUTENCAO_HIDRAULICA':
            categ ='Manutenção Hidraúlica'
          break
          case  'DIARISTA':
            categ ='Diarista'
          break
          case 'BABA':
            categ ='Babá'
          break
          case 'BABA_POR_TURNO':
            categ ='Babá por turno'
          break
          case 'PINTORA':
            categ ='Pintora'
          break
          case 'PEQUENOS_REPAROS':
            categ ='Pequenos reparos'
          break
          case 'COSTURA':
            categ ='Costura'
          break
          case 'HIGIENE_PESSOAL':
            categ ='Higiene Pessoal'
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
        <MenuPage /> 
      <DivAlignItems>
       <TitleForServiceTop > Serviços </TitleForServiceTop>
       <br />
       <LabelSerchBoxService >
       <SearchBoxService 
       type='search'
       name='serch-service'
       placeholder='Buscar'
       value={value}
       onChange={setFilter}
       />
       <ButtonSearch ><AiOutlineSearch />  </ButtonSearch>
       </LabelSerchBoxService>
       </DivAlignItems>
     
       <CapsuleForBoxes> 
        {serviceState.map((item) =>  
       <BoxForService key={item.id} >
        {(item.categorias).map((categoria) =><>
        <TitleForService>
            {TrataCategoria(categoria.categoria)} 
            {categ}          

         </TitleForService> 
         <TextForService> Valor por hora: {`R$ ${(categoria.valor).toString().replace(".", ",")}0`} </TextForService>
         <br /> 
         <Link to={`/requisicao?id=${item.id}&servico=${categoria.categoria}`} style={{ textDecoration: 'none', color: '#FFF' }} > Requisitar! </Link>
         </>)}    
         <br />  
         <TextForService> Prestadora: {item.nome}</TextForService>
         {(item.enderecos).map((endereco) =><>
        <TextForService>
            <br /> {endereco.cidade} | {endereco.uf} | {endereco.bairro}
         </TextForService> 
         <TextForService> <br /> <AiOutlineWhatsApp /> {item.phone} </TextForService>
         <TextForService> <Link to={`/prestadora/${item.id}`}> Saiba mais + </Link></TextForService>
         </>)}    
         <br />  
         </BoxForService>)}
    

    
       </CapsuleForBoxes>       
       </CapsuleForService>
       </>
    )
}

export default Services; 