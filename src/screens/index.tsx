import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootParamList} from './type';
import * as Auth from './Auth';
import * as Dashboard from './Dashboard';
import * as Advertising from './Advertising';
import {DrawerLayout} from '~/layout';

const Stack = createStackNavigator<RootParamList>();
const Screens = () => {
  return (
    <DrawerLayout>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen component={Auth.WelcomeScreen} name={'welcomeScreen'} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            component={Dashboard.DashboardScreen}
            name={'dashboardScreen'}
          />
        </Stack.Group>

        <Stack.Group screenOptions={TransitionPresets.SlideFromRightIOS}>
          <Stack.Screen
            component={Advertising.AdvertisingCategoryScreen}
            name={'createAdvertisingCategoryScreen'}
          />
          <Stack.Screen
            component={Advertising.AdvertisingTitleScreen}
            name={'createAdvertisingTitleScreen'}
          />
          <Stack.Screen
            component={Advertising.AdvertisingSpecificationsScreen}
            name={'createAdvertisingSpecificationsScreen'}
          />
        </Stack.Group>
      </Stack.Navigator>
    </DrawerLayout>
  );
};

export default Screens;
