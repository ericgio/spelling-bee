import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    color: #333;
    font-family: 'nyt-franklin', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  p {
    margin: 0 0 16px 0;
  }
`;

export default GlobalStyles;
