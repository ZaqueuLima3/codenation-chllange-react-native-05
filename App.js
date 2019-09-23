import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Acceleration from './src/screens/Acceleration';
import Profile from './src/screens/Profile';

const AppNavigator = createStackNavigator({
  Acceleration: {
    screen: Acceleration
  },
  Profile: {
    screen: Profile
  }
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
