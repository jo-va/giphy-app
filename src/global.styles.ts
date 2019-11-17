import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,600,900');

  html, body {
    font-family: Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
  }

  * {
    box-sizing: border-box;
  }
`;
