import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src/screens';
import {NativeBaseProvider} from "native-base";
import customTheme from "./src/util/CustomThem";
// import {store} from '~/store';

const config = {
    dependencies: {
        'linear-gradient': require('react-native-linear-gradient').default,
    },
};

const App = () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={customTheme} config={config}>
                {/*<Provider store={store}>*/}
                <Screens/>
                {/*</Provider>*/}
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default App;