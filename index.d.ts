import {RootParamList as R} from '~/screens/type';
import customTheme from "~/util/CustomThem";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends R {
        }
    }
}

type CustomThemeType = typeof customTheme;
declare module 'native-base' {
    interface ICustomTheme extends CustomThemeType {
    }
}