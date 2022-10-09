import React, { useState, useEffect } from 'react';
import {Route, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useUserContext } from '../../context/userContext';
import {  InputForEmail, InputForPassWord, FormForClient, InputButton, CapsuleForLogin } from './style';
const ClientLoggin = () => {
    const { signInUser, forgotPassword } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [errors, setError] = useState(false);
    const [exists, setExists] = useState(false);

 
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
        fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?email=${email}`,{ mode: 'no-cors'}) 
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


    function handleForm() {
      console.log("handleForm " + exists);
      if(exists)
        signInUser(email,password)
        else  window.location.href = '/login';
    }
    

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
        </InputButton>


        

    </FormForClient>
    </CapsuleForLogin>)
}


export default ClientLoggin;