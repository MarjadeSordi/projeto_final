import React, { useState, useEffect } from 'react';
import { BoxForService, ButtonSearch, CapsuleForService, CapsuleForBoxes, LabelSerchBoxService, SearchBoxService } from './style';
import { AiOutlineSearch } from "react-icons/ai";



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
       <LabelSerchBoxService >
       <SearchBoxService 
       type='search'
       name='serch-service'
       placeholder='Buscar'/>
       <ButtonSearch ><AiOutlineSearch />  </ButtonSearch>
       </LabelSerchBoxService>
      
       <CapsuleForBoxes> 
        {serviceState.map((item) =>  
       <BoxForService>
        {(item.categorias).map((categoria) =><>
        <span>
            <br /> {TrataCategoria(categoria.categoria)} <br />
            {categ}
            

         </span> <br />
         <span> {`R$ ${(categoria.valor).toString().replace(".", ",")}0`} </span>
         </>)}    
         <br />  
         <span> Prestadora: {item.nome}</span>
         {(item.enderecos).map((endereco) =><>
        <span>
            <br /> {endereco.cidade} - {endereco.uf} <br />
         </span> <br />
         <span> {endereco.bairro} </span>
         </>)}    
         <br />  
        
         </BoxForService>)}
    

    
       </CapsuleForBoxes>       
       </CapsuleForService>
       </>
    )
}

export default Services; 