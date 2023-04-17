import { forwardRef, HTMLProps } from 'react';
import styled from 'styled-components';

const $Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 12%;
`;

const $Hex = styled.div<{ $required?: boolean }>`
  color: ${({ theme, $required }) =>
    $required ? theme.colors.yellow : theme.colors.grey};
  font-size: 125px;
  line-height: 0.35;
  position: absolute;
  left: -12px;
  top: 1px;
`;

const $Input = styled.input<{ required?: boolean }>`
  /* background-color: ${({ theme }) => theme.colors.grey}; */
  background-color: transparent;
  border: 0;
  font-family: 'nyt-franklin', Arial, Helvetica, sans-serif;
  font-size: 2em;
  font-weight: 700;
  padding: 8px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  width: 50%;
  z-index: 1;

  ${({ required, theme }) => {
    if (required) {
      return `
        // background-color: ${theme.colors.yellow};
        color: ${theme.colors.black};
      `;
    }
  }}

  &:focus {
    /* background-color: transparent; */
  }
`;

interface HexProps {
  required?: boolean;
}

function Hex(props: HexProps) {
  return <$Hex $required={props.required}>&#x2B22;</$Hex>;
}

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'as'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <$Container>
      <$Input {...props} ref={ref} />
      <Hex required={props.required} />
    </$Container>
  );
});

Input.displayName = 'Input';

export default Input;
