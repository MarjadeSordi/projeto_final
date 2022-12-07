import React, {useState, useEffect} from 'react';
import { DivCapsule, DivText } from '../clientLoggin/style';
import MenuPage from '../menu';
import { ButtonModal, DivPicture, ImageSelfie, InputForComent, InputForText,ModalCapsule, ModalText,  ProfileBox,  ProfileText } from './style';
import selfie from '../../assets/selfie.jpg'
import Modal from 'react-modal';
import Loading from 'react-fullscreen-loading';
import {Link} from 'react-router-dom'; 

const ProviderDetails = () =>{ 
    const [serviceProvider, setServiceProvider] = useState([]);
    const [enderecos, setEndereco] = useState([])
    const [categoria, setCategoria] = useState()
    const [avaliacao, setAvaliacao] = useState()
    const [loading, setLoading] = useState(false);
    const urlParams = window.location.href;
    const urlSplit = urlParams.split('/')
    const findId= Number(urlSplit[urlSplit.length - 1]);


   const ServiceProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?id=${findId}`);
      const json = await response.json();
      setServiceProvider(json);   
      const endereco= json.enderecos[0]; 
      const categorias = json.categorias;
      setCategoria(categorias);
      setEndereco(endereco);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const AvaliacaoProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://whm.joao1866.c41.integrator.host:9206/avaliacao?userRequisitadoId=${findId}`);
      const json = await response.json();
      setAvaliacao(json);   
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

          let categ = ''
          const TrataCategoria = (categoria) => {
            switch(categoria){
              case 'MANUTENCAO_ELETRICA':
               categ= 'Manutenção elétrica'
               break
              case 'MANUTENCAO_HIDRAULICA':
                categ ='Manutenção hidraúlica'
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
            AvaliacaoProvider();
          }, []);
     
          
 return(

<>
{loading === false? <DivCapsule>
    <MenuPage/>
    <ProfileBox>
    <DivPicture> 
     <ImageSelfie src={selfie} />  </DivPicture>
     <ProfileText> Nome :  {serviceProvider.nome} <br/>  
     Cidade: {enderecos.cidade ? enderecos.cidade : '' } |  {enderecos.uf ? enderecos.uf : '' }
<br/>
Endereço: {enderecos.bairro ? enderecos.bairro : '' } | {enderecos.logradouro ? enderecos.logradouro : '' }  
<br/>

{categoria? categoria.map((item) => <>{TrataCategoria(item.categoria)} {categ} <br/>
Valor por hora: {`R$ ${(item.valor).toString().replace(".", ",")}0`} <br /> </>   ) : ''}


Contato: {serviceProvider.email}
<br/>
<br/>
Avaliações: {avaliacao && avaliacao.length > 0 ? avaliacao.map((item) => <><p> Nota: {item.nota} </p>
<p> Comentários: {item.comentario}</p> </>) : <p> Está usuária ainda não recebeu nenhuma avaliação.</p>}
<br/>
 </ProfileText> 
     
     </ProfileBox> 

{categoria ? <ButtonModal > Solicitar {TrataCategoria(categoria[0].categoria) } <Link to={`/requisicao/${findId}/servico/${categoria[0].categoria}`} style={{ textDecoration: 'none', color: '#FFF' }}> {categ}</Link> </ButtonModal> : '' }
{categoria && categoria.length > 1 ? <ButtonModal > Solicitar {TrataCategoria(categoria[1].categoria) } <Link to={`/requisicao/${findId}/servico/${categoria[1].categoria}`} style={{ textDecoration: 'none', color: '#FFF' }}> {categ}</Link> </ButtonModal> : '' }
    
</DivCapsule> : <Loading loading={loading} background="#2d3436" loaderColor= "rgb(216, 2, 134)"/> }
</>
 )   
}



export default ProviderDetails; 