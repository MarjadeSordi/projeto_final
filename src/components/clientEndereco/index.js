import {
     InputForText,  SelectedForState, SelectedForCity, InputButton
  } from './style';
import React, { useState, useEffect } from "react";
const ClientEndereco = (usuario) =>{
    let [user, setUser] = useState(usuario);
    let [uf, setUf] = useState('')
    let [listCity, setListCity] = useState([]);
    let [listState, setState] = useState([]);
    let [city, setCity] = useState('');
    let [bairro, setBairro] = useState('');
    let [cep, setCep] = useState('');
    let [number, setNumber] = useState('');
    let [complemento, setComplemento] = useState('');
    let [logradouro, setLogradouro] = useState('');

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

      useEffect(() => {
        if (uf) {
          PopulateCity(uf);
        }
      }, [uf]);
    
    
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

      const handleSave = () => {
        let alterUser = {...user};
        let enderecoNovo = {
            uf: uf,
            cep: cep,
            complemento: complemento,
            logradouro: logradouro,
            cidade: city,
            bairro: bairro,
            numero: number
        }
        let enderecos = Array.isArray(user.enderecos) ? user.enderecos : [];
            enderecos.push(enderecoNovo);
            alterUser.usuario.enderecos = enderecos;
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(alterUser.usuario),
            }
           fetch("http://whm.joao1866.c41.integrator.host:9206/usuario", options)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    
return(
    <>
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

<InputButton
          type="button"
          value="ENVIAR"
          onClick={handleSave}
        > Cadastrar! </InputButton>
  </>
)
}

export default ClientEndereco;