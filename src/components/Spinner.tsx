import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const spinnerBorder = keyframes`
  0% { transform:rotate(0deg); }
  100% { transform:rotate(360deg); }
`;

const $Spinner = styled.div`
  animation: 0.75s linear infinite ${spinnerBorder};
  aspect-ratio: 1;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 50%;
  border-right-color: transparent;
  display: inline-block;
  vertical-align: -0.125em;
  width: 2rem;
`;

function Spinner() {
  return <$Spinner aria-label="Loading..." role="status" />;
}

export default Spinner;
