import { forwardRef, HTMLProps } from 'react';
import styled from 'styled-components';

import Tile, { TileState } from './Tile';

const $Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 62px;
`;

const $Input = styled.input<{ required?: boolean }>`
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;
  font-weight: 700;
  outline: none;
  padding: 0.25rem 0.5rem;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  text-transform: uppercase;
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

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'as'> {
  state: TileState;
}

const TileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ state, ...props }, ref) => {
    return (
      <$Container>
        <$Input {...props} maxLength={1} ref={ref} />
        <Tile state={state} />
      </$Container>
    );
  }
);

TileInput.displayName = 'Input';

export default TileInput;
