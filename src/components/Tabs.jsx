import React from 'react';
import MainScreen from '../screens/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import homeIcon from '../../assets/icons/Home-6-white.png'

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveBackgroundColor: 'black',
        tabBarStyle: {
            backgroundColor: 'white'
        },
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tab.Screen name={'Home'} component={MainScreen} options={{ tabBarIcon: ({focused}) => (
        <Image source={homeIcon} style={{width: 25, tintColor: focused ? '#009444' : 'black', height: 25}} />
      )}} />
    </Tab.Navigator>
  );
}

export default Tabs