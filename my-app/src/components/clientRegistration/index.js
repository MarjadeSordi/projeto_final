import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputForText } from './style';

const ClientRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const dispatch = useDispatch();

    function registerName() {
        dispatch({
          type: 'NEW_FIRST_NAME_REGISTER',
          firsttName: firstName
        });
      }
    

    function handleFirstName(e) {
        e.preventDefault();
        setFirstName(e.target.value);
      }

    return(
        <InputForText 
        id='inputName'
        type="text"
        name="firstName"
        onChange={handleFirstName}
        onBlur={registerName}
        placeholder="Nome"
        maxLength="100"
        />

    )
}

export default ClientRegistration; 