import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuPage from '../menu';
import {
  ButtonModal, DivCapsule, InputForText, InputForEmail, InputForPassWord, SelectedForState, SelectedForCity, FormForClient, InputButton, InputCheckbox, LabelForCheckbox,
  SpanForTitle, DivText, DivModal,DivPrestadora,IoCamera,Image,Logo,InputImage,LabelImage,HireMe,
  SpanForLink,Buttons, Ptext
} from './style';
import Modal from 'react-modal';
import { useUserContext } from '../../context/userContext';
import {Navigate} from 'react-router-dom'; 

const ClientRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState(null);
  const [logradouro, setLogradouro] = useState('');
  const [password, setPassWord] = useState('');
  const [confirmPassword, setConfirmPassWord] = useState('');
  const [error, setError] = useState(false);
  const [listState, setState] = useState([]);
  const [exists, setExists] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [uf, setUf] = useState('')
  const [listCity, setListCity] = useState([]);
  const [city, setCity] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [number, setNumber] = useState('');
  const [complemento, setComplemento] = useState('');
  const [phone, setPhone] = useState('');
  const [client, setClient] = useState(false);
  const [prestadora, setPrestadora] = useState(false);
  const [enterPageLogin, setEnterPageLogin] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const [moreCateg, setMoreCateg] = useState(false);  
  const [cat1, setCat1]= useState('');  
  const [cat2, setCat2]= useState(''); 
  const [price1, setPrice1]=  useState('');
  const [price2, setPrice2]=  useState(''); 
  const [categ1, setTrataCate1] = useState('');
  const [categ2, setTrataCate2] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, photoURL, handleChange, registerUser,handleClick} = useUserContext();

  const categorias= ['Babá','Babá por turno', 'Costura', 'Diarista', 'Manutenção Elétrica',
  'Manutenção Hidraulica', 'Pequenos Reparos','Pintora', 'Higiene Pessoal']

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



  let categ = ''
  const TrataCategoria = (categoria) => {
    switch(categoria){
    case 'Manutenção Elétrica':
       categ= 'MANUTENCAO_ELETRICA'
       break
      case 'Manutenção Hidraulica':
        categ ='MANUTENCAO_HIDRAULICA'
      break
      case 'Diarista':
        categ ='DIARISTA'
      break
      case 'Babá':
        categ ='BABA'
      break
      case 'Babá por turno':
        categ ='BABA_POR_TURNO'
      break
      case 'Pintora':
        categ ='PINTORA'
      break
      case 'Costura':
        categ ='COSTURA'
      break
      case 'Pequenos Reparos':
        categ ='PEQUENOS_REPAROS'
        break 
      case 'Higiene Pessoal':
        categ ='HIGIENE_PESSOAL'
        break 
      default: categ = ''; 
    }

  }

  function handleOpen() {
		if (open === false) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}

  // método para verificar se nome já existe?
  function handleFirstName(e) {
    e.preventDefault();
    setFirstName(e.target.value);
  }

  function handlePassWord(e) {
    e.preventDefault();
    setPassWord(e.target.value);
  }

  function handleConfirmPassword(e) {
    e.preventDefault();
    if (password !== e.target.value) {
      return (setError(true))
    }
    else {
      setConfirmPassWord(e.target.value);
      setError(false)
    }
  }

  const PopulateStates = async () => {
    let url = 'https://servicodados.ibge.gov.br/';
    url = url + 'api/v1/localidades/estados';
    try {
      const responseStates = await fetch(url);
      const jsonState = await responseStates.json();
      jsonState.sort((a, b) => a.nome.localeCompare(b.nome));
      setState(jsonState);
    } catch (error) {
      console.error(error);
    }
  };

  function handleUf(e) {
    e.preventDefault();
    setUf(e.target.value);
  }

  useEffect(() => {
    PopulateStates();
  }, []);

  const PopulateCity = async (uf) => {
    let url = 'https://servicodados.ibge.gov.br/api/v1/';
    url = url + `localidades/estados/${uf}/municipios`;
    try {
      const responseCity = await fetch(url);
      const jsonCity = await responseCity.json();
      jsonCity.sort((a, b) => a.nome.localeCompare(b.nome));
      setListCity(jsonCity);
    } catch (error) {
      console.error(error);
    }
  };

  function handleCity(e) {
    e.preventDefault();
    setCity(e.target.value);
  }

  function handleBairro(e) {
    e.preventDefault();
    setBairro(e.target.value);
  }

  function handleLogradouro(e) {
    e.preventDefault();
    setLogradouro(e.target.value);
  }

  function handleCep(e) {
    e.preventDefault();
    setCep(e.target.value);
  }

  function handleNumber(e) {
    e.preventDefault();
    setNumber(e.target.value);
  }

  function handleComplemento(e) {
    e.preventDefault();
    setComplemento(e.target.value);
  }

  function handleEmail(e) {
    setIsNewUser(true)
    e.preventDefault();
    setEmail(e.target.value)
  ;}



  function handlePhone(e) {
    e.preventDefault();
    setPhone(e.target.value);
  }

  function handleClientCheckBox() {
    return (
      setClient(!client))
  }

  function handlePrestadoraCheckBox() {
    return (
      setPrestadora(!prestadora))
  }

  function handleMoreCategoria() {
    return (
      setMoreCateg(!moreCateg))
  }

  function handleTermsCheckBox() {
    return (
      setTerms(!terms)
    )
  }

  function handleCategoria1(e) {
    e.preventDefault();
    TrataCategoria(e.target.value);
    setCat1(e.target.value);
    setTrataCate1(categ);
  }

  function handleCategoria2(e) {
    e.preventDefault()
    TrataCategoria(e.target.value)
    setCat2(e.target.value);
    setTrataCate2(categ);
  }


  function handlePrice1(e) {
    e.preventDefault();
    setPrice1(e.target.value);
  }
  function handlePrice2(e) {
    e.preventDefault();
    setPrice2(e.target.value);
  }


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleRegister() {
    registerUser(email,firstName, confirmPassword).then(res => {
      registerBackEnd(res).then
      (res => console.log(res));
  })
    .catch((err) => setError(err.message));
  }


  async function getUser(email) {
    let result = await fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?email=${email}`);
    let jsonResult = await result.json();
    console.log(jsonResult);
    setExists(jsonResult);
    setPhone(jsonResult.telefone);
    setFirstName(jsonResult.nome);
    if(jsonResult.enderecos && jsonResult.enderecos.length > 0) {
      let endereco = jsonResult.enderecos[0];
      setUf(endereco.uf);
      setNumber(endereco.numero);
      setCity(endereco.cidade);
      setCep(endereco.cep);
      setLogradouro(endereco.logradouro);
      setComplemento(endereco.complemento);
    }
    if(jsonResult.categorias && jsonResult.categorias.length > 0) {
      let cat = jsonResult.categorias[0];
      setTrataCate1(cat.categoria);
      setPrice1(cat.valor);
    }
    if(jsonResult.categorias && jsonResult.categorias.length > 1) {
      let cat = jsonResult.categorias[1];
      setTrataCate1(cat.categoria);
      setPrice2(cat.valor);
    }

  }



  function registerBackEnd(res) {
    console.log(res);
    const cat2 = [{
      categoria: categ1,
      valor: Number(price1),
    },{
      categoria: categ2,
      valor: Number(price2),
    }]
    
    const cat1 =[ {
      categoria: categ1,
      valor: Number(price1),
    }]

    const categorias = categ2 !== '' ? cat2 : cat1;
    const body = {
      nome: firstName,
      userId: res.user.uid,
      pass: confirmPassword,
      email: email,
      telefone:phone,
      enderecos: [
        {
          uf: uf,
          cep:cep, 
          complemento: complemento,
          logradouro: logradouro,
          cidade: city,
          bairro: bairro,
          numero: Number(number)
        }
      ],
      categorias,
        client: client   	

  }
  if(exists !== null  && exists.id)
    body.id = exists.id;
  const options = {
    method: exists? 'PUT' : 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    }
    fetch('http://whm.joao1866.c41.integrator.host:9206/usuario', options).
      then(data => {;
        if (data.ok) {
          setNewUser(true)
         }
         else (
          setNewUser(false)
         )
         return console.error(data.json());         
    }).catch(e => {
      console.log(e);
      });
  }


  useEffect(() => {
    PopulateStates();
  }, []);

  useEffect(() => {
    if (uf) {
      PopulateCity(uf);
    }
  }, [uf]);

  useEffect(() => {
    if (!email && user && user.email) {
        setEmail(user.email);
        setIsNewUser(false);
    }
      else (console.log('error'))
  }, [user]);

  return (
    <DivCapsule>
      <MenuPage />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DivModal>
          <h2>Termos e condições. </h2>
          <br />
          * Ao realizar esse cadastro você confirma se identicar com o sexo feminino.<br />
          * Nossas prestadoras tem orientação para não atender solicitações de serviços
          quando a solicitante não for identificada como uma pessoa do sexo feminino. <br />
          * Nossas clientes tem orientação para não aceitar serviços quando identificarem que
          a prestadora não é do sexo feminino.<br />
          * Em qualquer situação de constrangimento, a solicitante ou a prestadora
          pode cancelar o serviço sem nenhum ônus. <br />
          * Ao realizar esse cadastro você confirma se identicar com o sexo feminino. <br />
          * Nossas prestadoras tem orientação para não atender solicitações de serviços
          quando a solicitante não for identificada como uma pessoa do sexo feminino. <br />
          * Nossas clientes tem orientação para não aceitar serviços quando identificarem que
          a prestadora não é do sexo feminino.<br />
          * Em qualquer situação de constrangimento, a solicitante ou a prestadora
          pode cancelar o serviço sem nenhum ônus. <br /> </DivModal>

        <InputCheckbox
          type='checkbox'
          checked={terms}
          onChange={handleTermsCheckBox}
        />

        <LabelForCheckbox> ACEITO OS TERMOS E CONDIÇÕES </LabelForCheckbox>
        <br />


        {terms ?
          < ButtonModal onClick={handleRegister}> CADASTRAR </ ButtonModal> : < ButtonModal onClick={closeModal}> SAIR </ ButtonModal>
        }
        <br /> 
        
        {newUser?
        <ButtonModal
        type="button"
        > Fazer meu login
        {newUser === true ? <Navigate to='/login'/> : ''}
        </ButtonModal>  : ''
        }
      </Modal>
      <DivText>
        <SpanForTitle> <h2>Bem vindas ao Evita!  </h2>
          <br /> Somos um local seguro, por isso antes de conhecer as nossas fornecedoras,
          você precisa estar cadastrada.
          <br /> Caiu por aqui por engano?
          <Link to='/login'> Quero fazer o meu login! </Link>
        </SpanForTitle>
      </DivText>
      <FormForClient>

              <Image>
								<Logo src={photoURL} />
								<InputImage
									type="file"
									id="file"
									name="image"
									acceppt="image/*, png, jpeg, jpg"
									onChange={handleChange}
								/>
								<LabelImage
									htmlFor="file"
									
								>
									<IoCamera></IoCamera>
								</LabelImage>
							</Image>
              <Buttons
								onClick={handleOpen}
							/>

        <InputForText
  
        id='inputName'
          type="text"
          name="firstName"
          onChange={handleFirstName}
          placeholder="Nome"
          maxLength="100"
  
      />

      <InputForEmail
        id='inputEmail'
        type="email"
        name="email"
        onChange={handleEmail}
        placeholder="Email"
        maxLength="100"
      />



        <InputForPassWord
          id='inputPassWord'
          type="password"
          name="senha"
          onChange={handlePassWord}
          placeholder="Senha"
          maxLength="100"
        />


        <InputForPassWord
          id='inputConfirmPassWord'
          type="password"
          name="confirmPassWord"
          onChange={handleConfirmPassword}
          placeholder="Confirme a Senha"
          maxLength="100"
          error={error}
        />

        <SelectedForState
          id='inputState'
          name="state"
          onChange={handleUf}
          value={uf}>
          {listState.map(listState => (
            <option key={listState.id} value={listState.sigla}>
              {listState.sigla}
            </option>
          ))}
        </SelectedForState>


        <SelectedForCity
          id='inputCity'
          name="city"
          value={city}
          onChange={handleCity}
        >
          {listCity.map(listCity => (
            <option key={listCity.id} value={listCity.nome}>
              {listCity.nome}
            </option>
          ))}
        </SelectedForCity>

        <InputForText
          id='inputBairro'
          type="text"
          name="bairro"
          onChange={handleBairro}
          placeholder="Bairro"
          maxLength="100"
        />

        <InputForText
          id='inputLogradouro'
          type="text"
          name="logradouro"
          onChange={handleLogradouro}
          placeholder="Rua"
          maxLength="100"
        />

        <InputForText
          id='inputCep'
          type="number"
          name="cep"
          onChange={handleCep}
          placeholder="CEP"
          maxLength={20}
          minLength={20}
        />

        <InputForText
          id='inputNumber'
          type="number"
          name="number"
          onChange={handleNumber}
          placeholder="Número"
          maxLength={5}
          minLength={1}
        />

        <InputForText
          id='inputComplemento'
          type="text"
          name="complemento"
          onChange={handleComplemento}
          placeholder="Complemento"
          maxLength={100}
        />
        <InputForText
          id='inputTel'
          type="number"
          name="telefone"
          onChange={handlePhone}
          placeholder="Telefone"
          maxLength="100"
        />
        <br></br>
        <InputCheckbox
          type='checkbox'
          checked={client}
          onChange={handleClientCheckBox}
        />
        <LabelForCheckbox> CLIENTE </LabelForCheckbox>
        <InputCheckbox
          type='checkbox'
          checked={prestadora}
          onChange={handlePrestadoraCheckBox}

        />
        <LabelForCheckbox> PRESTADORA </LabelForCheckbox>
        <br></br>
        {prestadora?       
       <>
       <DivPrestadora> 
       <Ptext>Selecione sua área de trabalho:   </Ptext> 
       <SelectedForCity
            id='inputCategoria'
            name="categoria"
            onChange={handleCategoria1}
            value={cat1}>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}       
     </SelectedForCity>
    <Ptext>  Preencha o valor por <b> hora </b> de trabalho:</Ptext>
     <InputForText
          id='inputPrice'
          type="number"
          name="telefone"
          placeholder="R$"
          maxLength="100"
          onChange={handlePrice1}
        />
        
    </DivPrestadora>
        <LabelForCheckbox>     
          <InputCheckbox
          type='checkbox'
          checked={moreCateg}
          onChange={handleMoreCategoria}

        />
         Deseja cadastrar mais de uma atividade? </LabelForCheckbox>

        {
          moreCateg? 
          <DivPrestadora> 

<Ptext>Selecione sua área de trabalho:   </Ptext> 
       <SelectedForCity
            id='inputCategoria'
            name="categoria"
            onChange={handleCategoria2}
            value={cat2}>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}       
     </SelectedForCity>
    <Ptext>  Preencha o valor por <b> hora </b> de trabalho:</Ptext>
     <InputForText
          id='inputPrice'
          type="number"
          name="telefone"
          placeholder="R$"
          maxLength="100"
          onChange={handlePrice2}
        />       
      
 
          </DivPrestadora>
          : ''
        }
      
       
   
       <Ptext>    Você pode oferecer até 2 atividades diferentes no cadastro inicial, mais categorias serão liberadas de acordo com o seu desempenho na plataforma.  </Ptext>

      
       </> :'' }
      
        

        <InputButton
          type="button"
          value="ENVIAR"
          onClick={exists === null?  openModal: handleRegister}
        > {exists === null ? 'Cadastre-se!' : 'Salvar' }</InputButton>

        <br />
        {enterPageLogin ?

          <><Link to='/login'> <SpanForLink> Quero fazer o meu login!</SpanForLink>  </Link></>
          : ''
        }

      </FormForClient>
    </DivCapsule>)
}


export default ClientRegistration;