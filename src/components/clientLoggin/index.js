import React, { useState } from 'react';
import {Navigate} from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { useUserContext } from '../../context/userContext';
import {  InputForEmail, InputForPassWord, FormForClient, InputButton, DivCapsule, DivText } from './style';
import MenuPage from '../menu';

const ClientLoggin = () => {
    const { signInUser, forgotPassword} = useUserContext();
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
        if (email.indexOf('@') > 0) {
         let result = fetch(`http://whm.joao1866.c41.integrator.host:9206/usuario?email=${email}`, { mode: 'no-cors' })
         .catch(error => console.error(error));
                if (result.ok) {
                  setExists(true);
                } else {
                  setExists(false);
                }
        }
      }

    const handleForm = () => {
      signInUser(email,password); 
      setLogin(true);
    };


    
    return(    
<DivCapsule>
        <MenuPage />  
      <FormForClient>
        <DivText> 
          Obrigada por usar o Evita!
          <br/> 
          Faça seu login e utilize o nosso serviço de forma segura. 
        </DivText>

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
    </DivCapsule>

    )
}


export default ClientLoggin;