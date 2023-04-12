import {RootParamList as R} from '~/screens/type';
import customTheme from '~/util/CustomThem';

type CustomThemeType = typeof customTheme;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends R {}
  }
}

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
