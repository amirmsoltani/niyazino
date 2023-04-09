import React from 'react';
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import {RootParamList} from "./type";
import * as Auth from "./Auth";
import * as Dashboard from "./Dashboard";
import * as Advertising from "./Advertising";

const Stack = createStackNavigator<RootParamList>();
const Screens = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name={"welcomeScreen"} component={Auth.WelcomeScreen}/>
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name={"dashboardScreen"} component={Dashboard.DashboardScreen}/>
            </Stack.Group>

            <Stack.Group screenOptions={TransitionPresets.SlideFromRightIOS}>
                <Stack.Screen name={"createAdvertisingCategoryScreen"}
                              component={Advertising.AdvertisingCategoryScreen}/>
                <Stack.Screen name={"createAdvertisingTitleScreen"}
                              component={Advertising.AdvertisingTitleScreen}/>
            </Stack.Group>

        </Stack.Navigator>
    );
};

export default Screens;