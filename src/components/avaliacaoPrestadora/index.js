import React, { useState } from 'react';
import MenuPage from '../menu';
import { ButtonModal, DivCapsule, InputForComent, SelectedForNote } from './style';


const ClientAvaliacao = () => {
  const [nota, setNota] = useState();
  const [comment, setComment] = useState();
  const [avaliacao, setNewAvaliacao] = useState(false);
  const urlParams = window.location.href;
  const urlSplit = urlParams.split('/')
  const findId = Number(urlSplit[urlSplit.length - 1]);

  const notas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  function handleNota(e) {
    e.preventDefault();
    setNota(e.target.value);
  }

  function handleComment(e) {
    e.preventDefault();
    setComment(e.target.value);
  }


  function registerAvaliation() {
    const data = {
      solicitacao: {
        id: findId
      },
      nota: nota,
      comentario: comment
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    fetch('http://whm.joao1866.c41.integrator.host:9206/avaliacao', options).then(result => {
      if (!result.ok) {
        throw Error(result.status);
      }
      else (
        setNewAvaliacao(true)
      )
      return console.error(data.json());
    }).catch(e => {
      console.log(e);
    });
  }




  return (<>
    <DivCapsule>
      <MenuPage />
      <p> Obrigada por avaliar, sua contribuição com a nossa plataforma ajuda a manter a qualidade dos nossos serviços. </p>
      <br />
      <br />
      <label> De 1 até 10 avalie seu atendimento:  </label>
      <SelectedForNote
        id='inputNota'
        name="nota"
        required
        onChange={handleNota}
        value={nota}>
        {notas.map(nota => (
          <option key={nota} value={nota}>
            {nota}
          </option>
        ))}
      </SelectedForNote>
      <label> Deixe um comentário </label>
      <InputForComent
        required
        id='inputComment'
        name="comment"
        onChange={handleComment}

      />

      <ButtonModal onClick={registerAvaliation}> Enviar Avaliação </ButtonModal>
      <br />
      {avaliacao ? 'Você avaliou seu atendimento com sucesso!' : ''}

    </DivCapsule></>)
}

export default ClientAvaliacao; 