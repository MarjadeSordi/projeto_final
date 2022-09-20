import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  
  }, 
  html{
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300px;
    text-rendering: optimizeLegibility;
}
`;

export default GlobalStyle;