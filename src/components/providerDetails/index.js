import React, { useState, useEffect } from 'react';
import { DivCapsule, DivText } from '../clientLoggin/style';
import MenuPage from '../menu';
import { ButtonModal, DivPicture, ImageSelfie, ProfileBox, ProfileText, TitleCalendar, Input, Label, Small, DivSolicitacao, TextSolicitacao } from './style';
import selfie from '../../assets/selfie.jpg'
import Modal from 'react-modal';
import Loading from 'react-fullscreen-loading';
import { useUserContext } from '../../context/userContext';
import {Navigate} from 'react-router-dom'; 

const ProviderDetails = (props) => {
  const [userLogado, setUserLogado] = useState(null);
  const [serviceProvider, setServiceProvider] = useState([]);
  const [enderecos, setEndereco] = useState([]);
  const [categoria, setCategoria] = useState();
  const [avaliacao, setAvaliacao] = useState();
  const [inicio, setInicio] = useState('');
  const [dia, setDia] = useState('');
  const [fim, setFim] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [available, setAvailable] = useState(false);
  const [solicitacao, setNewSolicitacao] = useState(false);
  const [notAvaliable, setNotAvaliable] = useState('');
  const [categChoice, setCategChoice] = useState();
  const urlParams = window.location.href;
  const urlSplit = urlParams.split('/')
  const findId = Number(urlSplit[urlSplit.length - 1]);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const { user } = useUserContext();

  function closeModal() {
    setIsOpen(false);
  }

  function handleInicio(e) {
    e.preventDefault();
    setInicio(e.target.value)
  }

  function handleDia(e) {
    e.preventDefault();
    setDia(e.target.value)
  }

  function handleFim(e) {
    e.preventDefault();
    setFim(e.target.value)
  }

  function handleDataFim(e) {
    e.preventDefault();
    setDataFim(e.target.value)
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

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  }


  const ServiceProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?id=${findId}`);
      const json = await response.json();
      setServiceProvider(json);
      const endereco = json.enderecos[0];
      const categorias = json.categorias;
      setCategoria(categorias);
      setEndereco(endereco);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function openModal(cat) {
    setIsOpen(true);
    setCategChoice(cat);
  }

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
    switch (categoria) {
      case 'MANUTENCAO_ELETRICA':
        categ = 'Manuten????o el??trica'
        break
      case 'MANUTENCAO_HIDRAULICA':
        categ = 'Manuten????o hidra??lica'
        break
      case 'DIARISTA':
        categ = 'Diarista'
        break
      case 'BABA':
        categ = 'Bab??'
        break
      case 'BABA_POR_TURNO':
        categ = 'Bab?? por turno'
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

  const HandleAvailableTime = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://whm.joao1866.c41.integrator.host:9206/solicitacao?userRequisitadoEmail=${serviceProvider.email}dataInicio=${dia}${inicio}&dataFim${dataFim}${fim}`);
      const json = await response.json();
      if (json.length === 0) {
        setAvailable(true)
      } else setNotAvaliable("Infelizmente este hor??rio n??o est?? dispon??vel");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByEmail = async (userEmail) => {
    let url = `http://whm.joao1866.c41.integrator.host:9206/usuario?email=${userEmail}`
    try {
      const responseServices = await fetch(url);
      const jsonService = await responseServices.json();
      setUserLogado(jsonService);
    } catch (error) {
      console.error(error);
    }
  };

  function handleSave(categoriaEscolhida) {
    const id = userLogado && userLogado.enderecos.map((item) => item.id).toString();
   
    const bodyRequest = {
      enderecoRequisitante: {
        id: Number(id)
      },
      userRequisitado: {
        id: Number(findId)
      },
      inicio: formatDate(dia) + " " + inicio,
      fim: formatDate(dataFim) + " " + fim,
      categoria: categoriaEscolhida,
      status: 'AGENDADO'
    }
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
    }

    fetch('http://whm.joao1866.c41.integrator.host:9206/solicitacao', options)
      .then(({ data }) => {
        setNewSolicitacao(true);
      })
      .catch((error) => {
        console.error(error, error);
      });
  };



  useEffect(() => {
    ServiceProvider();
    AvaliacaoProvider();

  }, []);

  useEffect(() => {
    if (user) {
      getUserByEmail(user.email);
    } else (console.log('error'));

  }, [user]);


  return (

    <>
      {loading === false ?


        <DivCapsule>

          <MenuPage />
          <ProfileBox>
            <DivPicture>
              <ImageSelfie src={selfie} />  </DivPicture>
            <ProfileText> Nome :  {serviceProvider.nome} <br />
              Cidade: {enderecos.cidade ? enderecos.cidade : ''} |  {enderecos.uf ? enderecos.uf : ''}
              <br />
              Endere??o: {enderecos.bairro ? enderecos.bairro : ''} | {enderecos.logradouro ? enderecos.logradouro : ''}
              <br />

              {categoria ? categoria.map((item) => <>{TrataCategoria(item.categoria)} {categ} <br />
                Valor por hora: {`R$ ${(item.valor).toString().replace(".", ",")}0`} <br /> </>) : ''}


              Contato: {serviceProvider.email}
              <br />
              <br />
              Avalia????es: {avaliacao && avaliacao.length > 0 ? avaliacao.map((item) => <><p> Nota: {item.nota} </p>
                <p> Coment??rios: {item.comentario}</p> </>) : <p> Est?? usu??ria ainda n??o recebeu nenhuma avalia????o.</p>


              }
              <br />
            </ProfileText>

          </ProfileBox>

          {categoria ? categoria.map((item) => <ButtonModal onClick={() => openModal(item.categoria)}>Solicitar {TrataCategoria(item.categoria)} {categ} </ButtonModal>) : ''}
          


          <Modal
            key={serviceProvider.id}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <TitleCalendar>Consulte os hor??rios dispon??vel da {serviceProvider.nome} :</TitleCalendar> <br />
            <Label for='data'> Escolha uma data de in??cio: </Label>
            <Input id="date" type="date" onChange={handleDia} min={formatDate(today)} value={dia} /> <br />
            <Label for='data'> Escolha uma data de t??rmino: </Label>
            <Input id="date" type="date" onChange={handleDataFim} min={formatDate(today)} value={dataFim} /> <br />
            <Label for="entrada">Escolha o hor??rio para receber a prestadora :</Label>

            <Input type="time" id="entrada" name="entrada" onChange={handleInicio}
              min="09:00" max="18:00" required />

            <Small>Hor??rio permitido das 09h ??s 18h</Small><br />

            <Label for="saida"> Selecione o hor??rio de sa??da da prestadora :</Label>

            <Input type="time" id="appt" name="appt" onChange={handleFim}
              min="09:00" max="19:00" required />

            <Small>Hor??rio permitido das 10h ??s 20h</Small>

            <ButtonModal onClick={HandleAvailableTime}> Consultar disponibilidade </ButtonModal> <br />
            <TitleCalendar> {notAvaliable} </TitleCalendar>



            <DivSolicitacao visible={available} >
              <TextSolicitacao> Ol?? {userLogado ? userLogado.nome : ''} ! <br />
                Hor??rio dispon??vel, vamos confirmar a sua solicita????o: <br />
                Cliente: {userLogado ? userLogado.nome : ''} <br />
                Endere??o: {userLogado ? userLogado.enderecos.map((item) => <p> Rua {item.logradouro}, num {item.numero} | Bairro {item.bairro} | Cidade {item.cidade} - {item.estado}</p>) : 'Voc?? precisa ter um endere??o cadastrado para efetivar uma solicita????o'} <br />

                Telefone: {userLogado ? userLogado.telefone : ''} <br />
                Servi??o: {categChoice ? TrataCategoria(categChoice) : ''} {categ} <br />
                Data de in??cio: {dia} | Data final: {dataFim} <br />
                Hor??rio in??cio: {inicio} | Hor??rio final: {fim} <br />

                <ButtonModal onClick={() => handleSave(categChoice)}> Solicitar Servi??o
                {solicitacao === true ? <Navigate to='/'/> : ''}
                 </ButtonModal> <br />


              </TextSolicitacao>

            </DivSolicitacao>


          </Modal>


        </DivCapsule> : <Loading loading={loading} background="#2d3436" loaderColor="rgb(216, 2, 134)" />}
    </>
  )
}



export default ProviderDetails; 