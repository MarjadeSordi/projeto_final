import React, {useState, useEffect} from 'react';
import { DivCapsule, DivText } from '../clientLoggin/style';
import MenuPage from '../menu';
import { ImageSelfie, ProfileBox, ProfileCapsule, ProfileProvider, ProfileText } from './style';
import selfie from '../../assets/selfie.jpg'

const ProviderDetails = (props) =>{ 
    const [serviceProvider, setServiceProvider] = useState([]);
    const [enderecos, setEndereco] = useState([])
    const [categoria, setCategoria] = useState()
    const urlParams = window.location.href;
    const urlSplit = urlParams.split('/')
    const findId= Number(urlSplit[urlSplit.length - 1]);

   console.error(findId)
    
   const ServiceProvider = async () => {
    try {
      const response = await fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?id=${findId}`);
      const json = await response.json();
      setServiceProvider(json);   
      const endereco= json.enderecos[0]; 
      const categorias = json.categorias;
      setCategoria(categorias);
      setEndereco(endereco);
    } catch (error) {
      console.log(error);
    }
  };



      console.error(serviceProvider, 'aaah')
      console.error(enderecos, 'INFERNOOO')
      console.error(categoria, 'INFERNOOO')
    
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

          useEffect(() => {
            ServiceProvider();
            console.log("Isso será executado uma vez!");
          }, []);
     
          
 return(
 <>
<DivCapsule>
    <MenuPage/>
    <ProfileBox>
     <ImageSelfie src={selfie} />  
     <ProfileText> Nome :  {serviceProvider.nome} <br/>  
     Cidade: {enderecos.cidade ? enderecos.cidade : '' } |  {enderecos.uf ? enderecos.uf : '' }
<br/>
Endereço: {enderecos.bairro ? enderecos.bairro : '' } | {enderecos.logradouro ? enderecos.logradouro : '' }  
<br/>
Serviços oferecidos:  {TrataCategoria(categoria[0].categoria)} {categ},
{TrataCategoria(categoria[0].categoria)} {categ} <br />


     </ProfileText> 
     
     </ProfileBox> 
</DivCapsule>
    </>
 )   
}



export default ProviderDetails; 