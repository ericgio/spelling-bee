import { DefaultTheme } from 'styled-components';

export const colors = {
  backgroundColor: '#ededed',
  borderColor: '#dcdcdc',
  black: '#000',
  grey: '#e6e6e6',
  yellow: '#f7da21',
};

export const breakpoints = {
  tablet: 700,
};

const theme: DefaultTheme = {
  borderRadius: '6px',
  colors,
  breakpoints,
};

export default theme;
