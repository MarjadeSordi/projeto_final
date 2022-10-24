import React, { useState } from 'react';
import {Navigate} from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { useUserContext } from '../../context/userContext';
import {  InputForEmail, InputForPassWord, FormForClient, InputButton, CapsuleForLogin } from './style';
const ClientLoggin = () => {
    const { signInUser, forgotPassword } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [errors, setError] = useState(false);
    const [exists, setExists] = useState(false);
    const [login, setLogin] = useState(false); 

 
    const dispatch = useDispatch();

    function handlePassWord(e){
        e.preventDefault();
        console.log("handlePassWord");
        setPassWord(e.target.value);
      }

    function handleEmail(e) {
        e.preventDefault();
        setEmail(e.target.value);
        if(email.indexOf('@') > 0) {
          console.log("handleEmail");
        fetch(`http://whm.joao1866.c41.integrator.host:9206/usuarios?email=${email}`,{ mode: 'no-cors'}) 
        .then(
          (result) => {
            setExists(true);
            console.log('aqui', result)
          },
          (error) => {
            console.error(error)
            setError(error);
          }
        )
      }
      }

    const handleForm = () => {
      let url = 'http://whm.joao1866.c41.integrator.host:9206/loggin';

        try {
        fetch(url , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password
        })}).then((response) => {
          console.error(response.status)
          if (response.status === 200){
         setLogin(true);
         }
      });
    }
       catch (error) {
        console.error(error);
      }
    };

    return(
      <CapsuleForLogin>
      <FormForClient>

        <InputForEmail
        id='inputEmail'
        type="email"
        name="email"
        onBlur={handleEmail}
        placeholder="Email"
        maxLength="100"
        />

        <InputForPassWord
        id='inputPassWord'
        type="password"
        name="senha"
        onBlur={handlePassWord}
        placeholder="Senha"
        maxLength="100"
        />

        <InputButton
        type="button"
        value="ENVIAR"
        onClick={handleForm}> Enviar
        {login === true ? <Navigate to='/dashboard'/> : ''}
        </InputButton>


        

    </FormForClient>
    </CapsuleForLogin>)
}


export default ClientLoggin;