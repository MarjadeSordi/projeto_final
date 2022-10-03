import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputForText, InputForEmail, InputForPassWord, SelectedForState, SelectedForCity, FormForClient, InputButton, InputCheckbox } from './style';

const ClientRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [confirmPassword, setConfirmPassWord] = useState('');
    const [error, setError] = useState(false);
    const [listState, setState] = useState([]);
    const [uf, setUf] = useState('')
    const [listCity, setListCity] = useState([]);
    const [city, setCity] = useState('');
    const [bairro, setBairro] =useState('');
    const [logradouro, setLogradouro] = useState('');
    const [cep, setCep] = useState('');
    const [number, setNumber] = useState('');
    const [complemento, setComplemento] = useState('');
    const dispatch = useDispatch();

    function handleForm() {
      console.error('1')
      console.error(cep)
        dispatch({
          type: 'NEW_CLIENT_REGISTER',
          firstName: firstName,
          email: email,
          pass: confirmPassword, 
          endereco: [
            {
              uf: uf,
              cep: cep,
              complemento: complemento,
              logradouro: logradouro,
              cidade: city,
              bairro: bairro,
              numero: number,
            }
          ],
          cliente: true, 

        });
      }
    
  // método para verificar se nome já existe?
    function handleFirstName(e) {
        e.preventDefault();
        setFirstName(e.target.value);
      }
     
    function handleEmail(e){
      e.preventDefault();
      setEmail(e.target.value);
    }

    function handlePassWord(e){
      e.preventDefault();
      setPassWord(e.target.value);
    }

    function handleConfirmPassword(e){
      e.preventDefault();
      if (password !== e.target.value){
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
        jsonState.sort((a,b) => a.nome.localeCompare(b.nome));
        setState(jsonState);
        console.error(listState)
      } catch (error) {
        console.error(error);
      }
    };

    function handleUf(e){
      e.preventDefault();
      setUf(e.target.value);
      console.error('AQUI',uf)
    }
    console.error('AQUI',uf)
    useEffect(() => {
      PopulateStates();
    },[]);

    const PopulateCity = async (uf) => {
      let url = 'https://servicodados.ibge.gov.br/api/v1/';
      url = url + `localidades/estados/${uf}/municipios`;
      try {
        const responseCity = await fetch(url);
        const jsonCity = await responseCity.json();
        console.error(jsonCity)
        jsonCity.sort((a,b) => a.nome.localeCompare(b.nome));
        setListCity(jsonCity);
      } catch (error) {
        console.error(error);
      }
    };

    function handleCity(e){
      e.preventDefault();
      setCity(e.target.value);
    }

    function handleBairro(e){
      e.preventDefault();
      setBairro(e.target.value);
    }

    function handleLogradouro(e){
      e.preventDefault();
      setLogradouro(e.target.value);
    }

    function handleCep(e){
      e.preventDefault();
      setCep(e.target.value);
    }

    function handleNumber(e){
      e.preventDefault();
      setNumber(e.target.value);
    }

    function handleComplemento(e){
      e.preventDefault();
      setComplemento(e.target.value);
    }




    useEffect(() => {
      PopulateStates();
    },[]);

   useEffect(() => {
      if (uf) {
        PopulateCity(uf);
      }
    }, [uf]);

    return(
      <FormForClient>
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
        value={uf}
    
    >
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
          <label> CLIENTE </label>
          <InputCheckbox
        type='checkbox'
        />
          <label> PRESTADORA </label>
          <br></br>
        <InputButton
        type="button"
        value="ENVIAR"
        onClick={handleForm}
         > Button </InputButton>

    </FormForClient>)
}

export default ClientRegistration; 