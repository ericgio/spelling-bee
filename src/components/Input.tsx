import * as React from 'react';
import styled from 'styled-components';

const backgroundColor = '#ededed';
const borderColor = '#dcdcdc';
const yellow = '#f7da21';

const borderRadius = '6px';

const $Input = styled.input<{ required?: boolean }>`
  background-color: ${backgroundColor}59;
  border: 1px solid ${borderColor};
  border-radius: ${borderRadius};
  font-family: 'nyt-franklin', Arial, Helvetica, sans-serif;
  font-size: 2em;
  font-weight: 700;
  padding: 8px 12px;
  text-align: center;
  text-transform: uppercase;
  width: 12%;

  ${({ required }) => {
    if (required) {
      return `
        background-color: ${yellow}21;
        border-color: ${yellow};
        color: ${yellow};
        // width: 10%;
      `;
    }
  }}

  &:focus {
    background-color: transparent;
  }
`;

export default $Input;
