import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../service/NavService';
import {kSTACKS} from '../../constants/Navigation';
import LaunchStack from './LaunchStack';
import MainStack from './MainStack';
const {Navigator, Screen} = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        initialRouteName={kSTACKS.LAUNCH_STACK}
        screenOptions={{
          gestureEnabled: false,
          animation: 'fade_from_bottom',
          orientation: 'portrait',
          headerShown: false,
        }}>
        <Screen name={kSTACKS.LAUNCH_STACK} component={LaunchStack} />
        <Screen name={kSTACKS.MAIN_STACK} component={MainStack} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
