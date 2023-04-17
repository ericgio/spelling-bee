import styled from 'styled-components';

const $Button = styled.button<{ $primary?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 2.5em;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  width: 5.5em;
  min-width: 5.5em;
  height: 3em;
  background-color: #fff;
  font-size: 1em;
  letter-spacing: 0.01em;

  &:active {
    background-color: ${({ theme }) => theme.colors.backgroundColor};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    opacity: 0.45;
  }

  ${({ $primary, theme }) => {
    if ($primary) {
      return `
        background-color: ${theme.colors.yellow};
        border-color: ${theme.colors.yellow};

        &:active {
          background-color: ${theme.colors.yellow}ab;
        }

        &[disabled] {
          background-color: ${theme.colors.yellow};
        }
      `;
    }
  }}
`;

export default $Button;
