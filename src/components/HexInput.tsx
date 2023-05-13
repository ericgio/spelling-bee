import { forwardRef, HTMLProps } from 'react';
import styled, { css } from 'styled-components';

const ARROW_Y_LG = 20;
const ARROW_Y_SM = 14;
const ARROW_X_LG = 34;
const ARROW_X_SM = 24;

const arrowStyles = css`
  border-left: ${ARROW_X_SM}px solid transparent;
  border-right: ${ARROW_X_SM}px solid transparent;
  content: '';
  height: 0;
  position: absolute;
  left: 0;
  width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    border-left-width: ${ARROW_X_LG}px;
    border-right-width: ${ARROW_X_LG}px;
  }
`;

const $Container = styled.div<{ required?: boolean }>`
  height: fit-content;
  padding: ${ARROW_Y_SM}px 0;
  position: relative;

  &:before {
    ${arrowStyles}
    border-bottom: ${ARROW_Y_SM}px solid ${({ theme, required }) =>
      required ? theme.colors.yellow : theme.colors.grey};
    top: 0;
  }

  &:after {
    ${arrowStyles}
    border-top: ${ARROW_Y_SM}px solid ${({ theme, required }) =>
      required ? theme.colors.yellow : theme.colors.grey};
    bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: ${ARROW_Y_LG}px 0;

    &:before {
      border-bottom-width: ${ARROW_Y_LG}px;
    }

    &:after {
      border-top-width: ${ARROW_Y_LG}px;
    }
  }
`;

const $Input = styled.input<{ required?: boolean }>`
  appearance: none;
  background-color: transparent;
  background-color: ${({ theme, required }) =>
    required ? theme.colors.yellow : theme.colors.grey};
  border: 0;
  font-size: 1.5rem;
  font-weight: 700;
  outline: none;
  padding: 0;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  z-index: 1;

  height: 28px;
  width: 48px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 2rem;
    height: 38px;
    width: 68px;
  }
`;

type HexInputProps = Omit<HTMLProps<HTMLInputElement>, 'as'>;

const HexInput = forwardRef<HTMLInputElement, HexInputProps>((props, ref) => {
  return (
    <$Container required={props.required}>
      <$Input {...props} ref={ref} />
    </$Container>
  );
});

HexInput.displayName = 'Input';

export default HexInput;
