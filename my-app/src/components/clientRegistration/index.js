import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuPage from '../menu';
import { DivCapsule, InputForText, InputForEmail, InputForPassWord, SelectedForState, SelectedForCity, FormForClient, InputButton, InputCheckbox, LabelForCheckbox, 
  SpanForTitle, DivText,
  SpanForLink} from './style';

const ClientRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassWord] = useState('');
  const [confirmPassword, setConfirmPassWord] = useState('');
  const [error, setError] = useState(false);
  const [listState, setState] = useState([]);
  const [exists, setExists] = useState(false);
  const [uf, setUf] = useState('')
  const [listCity, setListCity] = useState([]);
  const [city, setCity] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [cep, setCep] = useState('');
  const [number, setNumber] = useState('');
  const [complemento, setComplemento] = useState('');
  const [enterPageLogin, setEnterPageLogin] = useState(false)
  const dispatch = useDispatch();


  function handleForm() {
    console.error('1')
    setEnterPageLogin(true);
    dispatch({
      type: 'ENTER_PAGE_LOGIN',
      enterPageLogin
    })
  }

  function registerName() {
    //(save)
    dispatch({
      type: 'NEW_CLIENT_REGISTER',
      firstName: firstName,
      email: email,
      pass: confirmPassword,
      endereco:[
      {
        uf: uf,
        cep: cep,
        complemento: complemento,
        logradouro: logradouro,
        cidade: city,
        bairro: bairro,
        numero: number,
      }]
      ,
      cliente: true,

    });
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
      console.error(listState)
    } catch (error) {
      console.error(error);
    }
  };

  function handleUf(e) {
    e.preventDefault();
    setUf(e.target.value);
    console.error('AQUI', uf)
  }
  console.error('AQUI', uf)
  useEffect(() => {
    PopulateStates();
  }, []);

  const PopulateCity = async (uf) => {
    let url = 'https://servicodados.ibge.gov.br/api/v1/';
    url = url + `localidades/estados/${uf}/municipios`;
    try {
      const responseCity = await fetch(url);
      const jsonCity = await responseCity.json();
      console.error(jsonCity)
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
    e.preventDefault();
    setEmail(e.target.value);
    if (email.indexOf('@') > 0) {
      fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?email=${email}`, { mode: 'no-cors' })
        .then(
          (result) => {
            console.log(result);
            this.setExists(true);
          },
          (error) => {
            console.error(error)
            this.setError(error);
          }
        )
    }
  }

  function handleUserId(e) {
    e.preventDefault();
    handleUserId(e.target.value);
    fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?userId=${userId}`, { mode: 'no-cors' })
      .then(res => res.json())
      .then(
        (result) => {
          this.setExists(true);
        },
        (error) => {
          console.error(error)
          this.setError(error);
        }
      )
  }

  useEffect(() => {
    PopulateStates();
  }, []);

  useEffect(() => {
    if (uf) {
      PopulateCity(uf);
    }
  }, [uf]);

  return (
    <DivCapsule>
      <MenuPage />
      <DivText>
      <SpanForTitle> <h2>Bem vindas ao Evita!  </h2>
        <br /> Somos um local seguro, por isso antes de conhecer as nossas fornecedoras, 
         você precisa estar cadastrada. 
        <br /> Caiu por aqui por engano? 
        <Link to='/login'> Quero fazer o meu login! </Link>
      </SpanForTitle>
      </DivText>
    <FormForClient>
    
      <InputForText
        id='inputName'
        type="text"
        name="firstName"
        onChange={handleFirstName}
        onBlur={registerName}
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
        maxLength={8}
        minLength={8}
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
      <br></br>
      <InputCheckbox
        type='checkbox'
      />
      <LabelForCheckbox> CLIENTE </LabelForCheckbox>
      <InputCheckbox
        type='checkbox'
      />
      <LabelForCheckbox> PRESTADORA </LabelForCheckbox>
      <br></br>
 
      <InputButton
        type="button"
        value="ENVIAR"
        onClick={handleForm}
      > Cadastre-se! </InputButton>

<br /> 
  {enterPageLogin ?
  
  <><Link to='/login'> <SpanForLink> Quero fazer o meu login!</SpanForLink>  </Link></>
         : ''
    }

    </FormForClient>
    </DivCapsule>)
}


export default ClientRegistration;