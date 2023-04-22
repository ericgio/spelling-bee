import { forwardRef, HTMLProps } from 'react';
import styled from 'styled-components';

const $Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 68px;
`;

const $Hex = styled.div<{ $required?: boolean }>`
  color: ${({ theme, $required }) =>
    $required ? theme.colors.yellow : theme.colors.grey};
  font-size: 84px;
  line-height: 0.35;
  position: absolute;
  left: -6px;
  top: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 125px;
    left: -8px;
    top: 1px;
  }
`;

const $Input = styled.input<{ required?: boolean }>`
  background-color: transparent;
  border: 0;
  font-family: 'nyt-franklin', Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 700;
  outline: none;
  padding: 4px 8px;
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
    font-size: 32px;
    padding: 8px;
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
