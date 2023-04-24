import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    color: #333;
    font-family: ${({ theme }) => theme.fontFamily.text};
    -webkit-font-smoothing: antialiased;
  }

  input {
    font-family: ${({ theme }) => theme.fontFamily.text};
  }

  p {
    margin: 0 0 16px 0;
  }
`;

export default GlobalStyles;
