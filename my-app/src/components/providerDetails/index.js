import React, {useState, useEffect} from 'react';
import { DivCapsule, DivText } from '../clientLoggin/style';
import MenuPage from '../menu';
import { ButtonModal, ImageSelfie, InputForComent, InputForText, ModalText, ProfileBox, ProfileCapsule, ProfileProvider, ProfileText } from './style';
import selfie from '../../assets/selfie.jpg'
import Modal from 'react-modal';

const ProviderDetails = (props) =>{ 
    const [serviceProvider, setServiceProvider] = useState([]);
    const [enderecos, setEndereco] = useState([])
    const [categoria, setCategoria] = useState()
    const [modal, setModal] = useState(false);
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
<Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
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
      </Modal>
    <MenuPage/>
    <ProfileBox>
     <ImageSelfie src={selfie} />  
     <ProfileText> Nome :  {serviceProvider.nome} <br/>  
     Cidade: {enderecos.cidade ? enderecos.cidade : '' } |  {enderecos.uf ? enderecos.uf : '' }
<br/>
Endereço: {enderecos.bairro ? enderecos.bairro : '' } | {enderecos.logradouro ? enderecos.logradouro : '' }  
<br/>
Categorias: {/*categoria.map((item) => {
    <p> {TrataCategoria(item.categoria)} 
      </p>
})}{categ*/} <br />
Contato: {serviceProvider.email}
<br/>
Avaliações: 
<br/>

<ButtonModal onClick={() => setModal(true)}> Avaliar </ButtonModal>


     </ProfileText> 
     
     </ProfileBox> 
</DivCapsule>
    </>
 )   
}



export default ProviderDetails; 