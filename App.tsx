import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src/screens';
import {NativeBaseProvider} from 'native-base';
import customTheme from './src/util/CustomThem';
import {Provider} from 'react-redux';
import {store} from '~/store';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider config={config} theme={customTheme}>
        <Provider store={store}>
          <Screens />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
