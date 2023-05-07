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
  box-sizing: border-box;
  font-size: 2rem;
  font-weight: 700;
  height: 100%;
  outline: none;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  z-index: 1;

  ${({ required, theme }) => {
    if (required) {
      return `
        color: ${theme.colors.black};
      `;
    }
  }}
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
