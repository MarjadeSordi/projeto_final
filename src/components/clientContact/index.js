import React, {useState} from 'react';
import { DivCapsule, FormForClient } from "./style";
import MenuPage from "../menu";


const ClientContact = () =>{
	const [campos, setCampos] = useState({
		nome: '',
		email: '',
		mensagem: '',

	});


return(
	<DivCapsule>
	<MenuPage />
      <FormForClient>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" placeholder="E-mail de destino.." />
 
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Nome da pessoa.." />
 
        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="Escreva algo.." className="textArea"></textarea>
 
     
        <input type="submit" value="Enviar" />
      </FormForClient>
 


	</DivCapsule>
)
}

export default ClientContact; 