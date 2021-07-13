import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

export default function App() {
  return (
    <AppContainer />
  )
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppDrawerNavigator},
  BottomTab: { screen: AppTabNavigator }
})

const AppContainer = createAppContainer(switchNavigator);