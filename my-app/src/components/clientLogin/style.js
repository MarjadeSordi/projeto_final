import styled , { css } from 'styled-components';

export const InputForText = styled.input`
  background-color: transparent;
  border: 1px solid #000000;
  margin: 2%;
  border-radius: 8px;
  width: 80%;
  padding: 8px;
  :: placeholder {
    color: #696969;
    font-family: 'Roboto', sans-serif;
  }
`;

export const InputForEmail = styled.input`
  background-color: transparent;
  border: 1px solid #000000;
  margin: 2%;
  border-radius: 8px;
  width: 80%;
  padding: 8px;
  :: placeholder {
    color: #696969;
    font-family: 'Roboto', sans-serif;
  }
`;

export const InputForPassWord = styled.input`
  background-color: transparent;
  border: 1px solid #000000;
  margin: 2%;
  border-radius: 8px;
  width: 80%;
  padding: 8px;
  :: placeholder {
    color: #696969;
    font-family: 'Roboto', sans-serif;
  }
  border: ${props => (props.error ? '2px solid #EB5757' : '')};
`

export const InputButton = styled.button`
  background-color: transparent;
  border: 1px solid #000000;
  margin: 2%;
  border-radius: 8px;
  width: 50%;
  padding: 8px;
`

;