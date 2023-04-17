import 'styled-components';

import { colors } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: typeof colors;
  }
}
