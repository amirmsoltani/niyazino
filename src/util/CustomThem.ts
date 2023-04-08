import {extendTheme} from 'native-base';

const customTheme = extendTheme({
    fontConfig: {
        YekanBakh: {
            100: {normal: 'YekanBakh-Thin'},
            300: {normal: 'YekanBakh-Light'},
            400: {normal: 'YekanBakh-Regular'},
            500: {normal: 'YekanBakh-SemiBold'},
            600: {normal: 'YekanBakh-Bold'},
            700: {normal: 'YekanBakh-ExtraBold'},
            800: {normal: 'YekanBakh-Black'},
            900: {normal: 'YekanBakh-ExtraBlack'},
        },
    },

    fonts: {
        YekanBakh: "YekanBakh",
        heading: 'YekanBakh',
        body: 'YekanBakh',
        mono: 'YekanBakh',
    },
    sizes: {
        "14": "56px",
        "28": "112px",
    }
});


export default customTheme;
