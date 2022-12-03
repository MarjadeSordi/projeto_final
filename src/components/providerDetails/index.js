import React, {useState, useEffect} from 'react';
import { DivCapsule, DivText } from '../clientLoggin/style';
import MenuPage from '../menu';
import { ButtonModal, ImageSelfie, InputForComent, InputForText,ModalCapsule, ModalText,  ProfileBox,  ProfileText } from './style';
import selfie from '../../assets/selfie.jpg'
import Modal from 'react-modal';
import Loading from 'react-fullscreen-loading';
import {Link, Navigate} from 'react-router-dom'; 

const ProviderDetails = () =>{ 
    const [serviceProvider, setServiceProvider] = useState([]);
    const [enderecos, setEndereco] = useState([])
    const [categoria, setCategoria] = useState()
    const [categoria2, setCategoria2] = useState()
    const [modal, setModal] = useState(false);
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#2d3436',
      backgroundImage: 'linear-gradient(315deg, #2d3436 0%, #000000 74%)',
      width: '60%'
    },
  };

  function closeModal() {
    setModal(false);
  }

      console.error(categoria, 'INFERNOOO')
    
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
          }, []);
     
          
 return(

<>
{loading === false? <DivCapsule>
<Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
                <ModalCapsule>
        <ModalText> Olá! Fique a vontade para avaliar a {serviceProvider.nome} </ModalText>
        <ModalText> Vamos lá, de 1 a 10 como você avalia que foi o atendimento? </ModalText>
        <InputForText
          id='inputNota'
          type="number"
          name="nota"    
          placeholder="Nota"
          maxLength={10}
   
        />

<ModalText> Gostaria de deixar um comentário? </ModalText>
<InputForComent
          id='inputText'
          type="textarea"
          name="comentario"    
          placeholder="Comentário"          
           />
        <br />
        <ButtonModal> Enviar </ButtonModal>
        </ModalCapsule>
      </Modal>
    <MenuPage/>
    <ProfileBox>
     <ImageSelfie src={selfie} />  
     <ProfileText> Nome :  {serviceProvider.nome} <br/>  
     Cidade: {enderecos.cidade ? enderecos.cidade : '' } |  {enderecos.uf ? enderecos.uf : '' }
<br/>
Endereço: {enderecos.bairro ? enderecos.bairro : '' } | {enderecos.logradouro ? enderecos.logradouro : '' }  
<br/>
Categoria: {categoria? TrataCategoria(categoria[0].categoria) : ''} {categ} <br/> 
Valor por hora: {categoria? `R$ ${(categoria[0].valor).toString().replace(".", ",")}0` : ''} <br />

{categoria && categoria.length > 1 ? TrataCategoria(categoria[1].categoria) : ''} 
{categoria && categoria.length > 1 ? `Categoria: ${categ} `: ''} <br/> 
{categoria && categoria.length > 1 ? `Valor por hora:R$ ${(categoria[1].valor).toString().replace(".", ",")}0` : ''} <br />

Contato: {serviceProvider.email}
<br/>
Avaliações: 
<br/>
 </ProfileText> 
     
     </ProfileBox> 
<ButtonModal onClick={() => setModal(true)}> Avaliar </ButtonModal> <br/>
{categoria ? <ButtonModal > Solicitar {TrataCategoria(categoria[0].categoria) } <Link to={`/requisicao/${findId}/servico/${categoria[0].categoria}`} style={{ textDecoration: 'none', color: '#FFF' }}> {categ}</Link> </ButtonModal> : '' }
{categoria && categoria.length > 1 ? <ButtonModal > Solicitar {TrataCategoria(categoria[1].categoria) } <Link to={`/requisicao/${findId}/servico/${categoria[1].categoria}`} style={{ textDecoration: 'none', color: '#FFF' }}> {categ}</Link> </ButtonModal> : '' }
    
</DivCapsule> : <Loading loading={loading} background="#2d3436" loaderColor= "rgb(216, 2, 134)"/> }
</>
 )   
}



export default ProviderDetails; 