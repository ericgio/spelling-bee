import { forwardRef, HTMLProps } from 'react';
import styled from 'styled-components';

import Tile from './Tile';

const $Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 68px;
`;

const $Input = styled.input<{ required?: boolean }>`
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;
  font-weight: 700;
  outline: none;
  padding: 0.25rem 0.5rem;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  width: 50%;
  z-index: 1;

  ${({ required, theme }) => {
    if (required) {
      return `
        color: ${theme.colors.black};
      `;
    }
  }}

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 2rem;
    padding: 0.5rem;
  }
`;

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'as'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <$Container>
      <$Input {...props} ref={ref} />
      <Tile as={'input'} state="empty" />
    </$Container>
  );
});

Input.displayName = 'Input';

export default Input;
