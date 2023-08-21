/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  const ignoreWarns = ['ViewPropTypes will be removed from React Native'];
  const warn = console.error;
  console.error = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0]?.startsWith?.(warning)) {
        return;
      }
    }
    warn(...arg);
  };
  LogBox.ignoreLogs(ignoreWarns);
}
AppRegistry.registerComponent(appName, () => App);
