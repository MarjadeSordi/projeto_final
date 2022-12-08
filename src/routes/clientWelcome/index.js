import React, { useState, useEffect } from 'react';
import ImagemFirstPage from '../../components/imagemfirstpage';
import MenuPage from '../../components/menu';
import { BodyPage, BoxForService, ButtonFirstPage, CapsuleForBoxes, DivTextIntro, TextForService, TitleForService, ButtonModal, InputForComent, InputForText, ModalCapsule, ModalText, ButtonM, TextForTitle } from './style';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useUserContext } from "../../context/userContext";
import Modal from 'react-modal';

const ClientWelcome = () => {
  const { user } = useUserContext();
  const [usuario, setUsuario] = useState([])
  const [id, setId] = useState()



  function setInfos(){
    console.error(id);
  }

  function handleId(e){
    e.preventDefault();
    setId(e.target.value);
    console.error('aqui', id);
  }

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





  async function SetUser(userEmail) {
    let url = `http://whm.joao1866.c41.integrator.host:9206/solicitacao?userRequisitanteEmail=${userEmail}`;
    try {
      const responseServices = await fetch(url);
      const jsonService = await responseServices.json();
      setUsuario(jsonService);
    } catch (error) {
      console.error(error);
    }
  }

 function setAvaliacao(bodyAvaliacao) {
  fetch('http://whm.joao1866.c41.integrator.host:9206/avaliacao', {
    method: "POST",
    body: JSON.stringify(bodyAvaliacao),
    headers: {"Content-type": "application/json"}
  }).then(response => response.json()) 
  .then(json => console.error(json));
 }

  let categ = ''

  const TrataCategoria = (categoria) => {
    switch (categoria) {
      case 'MANUTENCAO_ELETRICA':
        categ = 'Manutenção elétrica'
        break
      case 'MANUTENCAO_HIDRAULICA':
        categ = 'Manutenção Hidraúlica'
        break
      case 'DIARISTA':
        categ = 'Diarista'
        break
      case 'BABA':
        categ = 'Babá'
        break
      case 'BABA_POR_TURNO':
        categ = 'Babá por turno'
        break
      case 'PINTORA':
        categ = 'Pintora'
        break
      case 'PEQUENOS_REPAROS':
        categ = 'Pequenos reparos'
        break
      case 'COSTURA':
        categ = 'Costura'
        break
      case 'HIGIENE_PESSOAL':
        categ = 'Higiene Pessoal'
        break
      default: categ = '';
    }
  }

  let preco = ''




  useEffect(() => {
    if (user && user.displayName) {
      SetUser(user.email);
    } else (console.log('error'));

  }, [user]);

  console.error(usuario, 'teste')
  return (
    <>

      <BodyPage>
        <MenuPage />
        <ImagemFirstPage />
        <DivTextIntro>
          <TitleForService> Conectadas somos mais fortes! </TitleForService>
          {user ? ( usuario.length > 0 ?
            <CapsuleForBoxes>
              <TextForTitle> Minhas solitações: </TextForTitle> <br />
              {usuario.map((item) =>
                  <BoxForService key={item.id}>                  
                  <TextForService> Serviço: {TrataCategoria(item.categoria)} {categ} </TextForService> <br />
                  <TextForService> Agendamento: {item.inicio} </TextForService><br />
                  <TextForService> Atendimento: {item.fim} </TextForService> <br />
                  <TextForService> Prestadora: {item.userRequisitado.nome} </TextForService> <br />
                  <TextForService> Status: {item.status} </TextForService>
                  {item.status === 'CONCLUIDO' ?  <><br /> <ButtonModal > <Link to={`/avaliacao/${item.id}`} style={{ textDecoration: 'none', color: '#FFF' }} target="_blank"> Avaliar </Link> </ButtonModal> </> : ''}
                 
                </BoxForService>

              )} </CapsuleForBoxes>:<TitleForService> Você ainda não fez nenhuma solitação de Serviço </TitleForService> ) 
        
  : <>
              <br />
              <br />
              <p> Somos um serviço virtual de contato para serviços gerais, que visa a sua segurança. <br />
                Nossas prestadoras credenciadas, e nossas clientes
                <br />
                são apenas pessoas que se identificam com o sexo feminino.
              </p>
              <Link to="/cadastro">
                <ButtonFirstPage> CADASTRE-SE E CONHEÇA <AiOutlineArrowRight /> </ButtonFirstPage>
              </Link></>}

        </DivTextIntro>


      </BodyPage>

    </>
  )
}

export default ClientWelcome; 