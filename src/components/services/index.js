import React, { useState, useEffect } from 'react';
import { auth } from "../../context/firebase";
import { BoxForService, ButtonSearch, CapsuleForService, 
  CapsuleForBoxes, DivAlignItems, LabelSerchBoxService, SearchBoxService, TextForService ,TitleForService, TitleForServiceTop } from './style';
import { AiOutlineSearch, AiOutlineWhatsApp } from "react-icons/ai";
import MenuPage from '../menu';
import { Link } from 'react-router-dom';
import Loading from 'react-fullscreen-loading';

const Services = () =>{
  const [loading, setLoading] = useState(false);
    const [serviceState, setServiceState] = useState([]);
    const [services, setServices] = useState([]);
    const [value, setValue] =  useState();

    function setFilter(e) {
      e.preventDefault();
      setValue(e.target.value);

          if(value && value !== " " && serviceState) {
            let serviceStateFilter = serviceState.filter(item => {
              let contemCategoria = false;
              item.categorias.forEach(element => {
                contemCategoria = element.categoria.toLowerCase()
                .includes(value.toLowerCase())
              });
              return contemCategoria || item.nome.toLowerCase().includes(value.toLowerCase());
            });
            setServiceState(serviceStateFilter);         

        }      
    } 

    function setCleanFilter(){
      if(!value && value === '')
      {
        SetServices()
      }
    }

    async function SetServices() {
    let url = 'http://whm.joao1866.c41.integrator.host:9206/usuarios?tipo=PRESTADOR';
    try {
      setLoading(true);
      const responseServices = await fetch(url);
      const jsonService = await responseServices.json();
      jsonService.filter((item) => item.categorias);
      jsonService.sort((a, b) => a.nome.localeCompare(b.nome));
      setServiceState(jsonService);
      setServices(jsonService);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }


      let categ = ''
      const TrataCategoria = (categoria) => {
        switch(categoria){
          case 'MANUTENCAO_ELETRICA':
           categ= 'Manuten????o el??trica'
           break
          case 'MANUTENCAO_HIDRAULICA':
            categ ='Manuten????o Hidra??lica'
          break
          case  'DIARISTA':
            categ ='Diarista'
          break
          case 'BABA':
            categ ='Bab??'
          break
          case 'BABA_POR_TURNO':
            categ ='Bab?? por turno'
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

        {loading === false? <CapsuleForService>
        <MenuPage /> 
      <DivAlignItems>
       <TitleForServiceTop > Servi??os </TitleForServiceTop>
       <br />
       <LabelSerchBoxService >
       <SearchBoxService 
       type='search'
       name='serch-service'
       placeholder='Buscar'
       value={value}
       onChange={setFilter}
       onBlur={setCleanFilter}
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
       </CapsuleForService> :  <Loading loading={loading} background="#2d3436" loaderColor= "rgb(216, 2, 134)"/>}
         </>
    )
}

export default Services; 