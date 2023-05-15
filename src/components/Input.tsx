import styled from 'styled-components';

const $Input = styled.input`
  appearance: none;
  background-clip: padding-box;
  height: calc(2.75rem + 2px);
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.wordle.green};
    box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.wordle.green}40;
  }
`;

export default $Input;
