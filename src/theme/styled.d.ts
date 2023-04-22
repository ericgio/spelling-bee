import 'styled-components';

import { breakpoints, colors } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    breakpoints: typeof breakpoints;
    colors: typeof colors;
  }
}
