import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {kROUTES} from '../../constants/Navigation';
import SplashPageView from '../pages/splash';

const {Navigator, Screen} = createNativeStackNavigator();

const LaunchStack = () => (
  <Navigator
    initialRouteName={kROUTES.SPLASH_SCREEN}
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}>
    <Screen name={kROUTES.SPLASH_SCREEN} component={SplashPageView} />
  </Navigator>
);

export default LaunchStack;
