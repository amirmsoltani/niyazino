import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Screens from './src/screens';
import {NativeBaseProvider} from 'native-base';
import customTheme from './src/util/CustomThem';
import {Provider} from 'react-redux';
import {store} from '~/store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fa';
import {UpdateModal} from '~/layout';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
dayjs.extend(require('dayjs-jalali'));
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider config={config} theme={customTheme}>
        <Provider store={store}>
          <UpdateModal />
          <Screens />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
