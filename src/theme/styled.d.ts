import 'styled-components';

import { breakpoints, colors, fontFamily } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    breakpoints: typeof breakpoints;
    colors: typeof colors;
    fontFamily: typeof fontFamily;
  }
}
