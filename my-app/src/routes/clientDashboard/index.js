import React, { useState, useEffect }  from 'react';
import Services from '../../components/services';
import { useUserContext } from "../../context/userContext";

const ClientDashboard = () =>{
    const { user, serverUser } = useUserContext();

    useEffect(() => {
        if (user.displayName) {
          console.log("useEffect user" + user.displayName);
        }
      }, [user]);
    return(
        <>
        <h1> Serviços </h1>
        <h2>Nome: {user.displayName}</h2>
		    <h2>Email: {user.email}</h2>
        <Services /></>
    )
}

export default ClientDashboard; 