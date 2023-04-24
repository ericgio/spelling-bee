import styled from 'styled-components';

const $Title = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.heading};
  font-size: 42px;
  margin: 0 0 16px 0;
`;

export default $Title;
