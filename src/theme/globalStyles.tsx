import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    color: #333;
    font-family: ${({ theme }) => theme.fontFamily.text};
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  input,
  textarea {
    background-color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.black};
    display: block;
    font-family: ${({ theme }) => theme.fontFamily.text};
    font-size: 1rem;
    line-height: 1.5;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: 0;
    }

    &.spelling-bee:focus {
      border-color: ${({ theme }) => theme.colors.yellow};
      box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.yellow}40;
    }

    &.wordle:focus {
      border-color: ${({ theme }) => theme.colors.wordle.green};
      box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.wordle.green}40;
    }
  }

  p {
    margin: 0 0 16px 0;
  }
`;

export default GlobalStyles;
