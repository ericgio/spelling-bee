import { DefaultTheme } from 'styled-components';

const wordleGreen = '#6aaa64';
const wordleYellow = '#c9b458';

export const colors = {
  backgroundColor: '#ededed',
  borderColor: '#dcdcdc',
  black: '#000000',
  greyText: '#959595',
  grey: '#e6e6e6',
  yellow: '#f7da21',
  white: '#ffffff',
  wordle: {
    green: wordleGreen,
    yellow: wordleYellow,
    tbd: '#878a8c',
    absent: '#787c7e',
    present: wordleYellow,
    correct: wordleGreen,
  },
};

export const breakpoints = {
  mobile: 420,
  tablet: 700,
};

export const fontFamily = {
  header: "'nyt-karnak', Helvetica, Arial, sans-serif",
  title: "'nyt-karnakcondensed', Helvetica, Arial, sans-serif",
  text: "'nyt-franklin', Helvetica, Arial, sans-serif",
};

const theme: DefaultTheme = {
  borderRadius: '6px',
  colors,
  breakpoints,
  fontFamily,
};

export default theme;
