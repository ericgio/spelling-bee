import styled from 'styled-components';

const $Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-size: 42px;
  margin: 0 0 1rem 0;
`;

export default $Title;
