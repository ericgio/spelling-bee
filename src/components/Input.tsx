import styled from 'styled-components';

const $Input = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.black};
  display: block;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.wordle.green};
    box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.wordle.green}40;
    outline: 0;
  }
`;

export default $Input;
