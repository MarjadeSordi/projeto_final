import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../context/userContext';
import {  InputForEmail, InputForPassWord, FormForClient, InputButton } from './style';

const ClientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [error, setError] = useState(false);
    const [exists, setExists] = useState(false);
 
    const dispatch = useDispatch();

    function handlePassWord(e){
        e.preventDefault();
        setPassWord(e.target.value);
      }

    function handleEmail(e) {
        e.preventDefault();
        setEmail(e.target.value);
        if(email.indexOf('@') > 0) {
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
      if(exists)
        signInUser(email,password)
        else 
    }
    

    return(
      <FormForClient>

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

<Route exact path="/">
  {exists ?
        <InputButton
        type="button"
        value="ENVIAR"
        onClick={handleForm}> Button
        </InputButton>
         : <Redirect to="/dashboard" />
    }
</Route>

        
        

    </FormForClient>)
}


export default ClientLogin;