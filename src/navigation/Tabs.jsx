// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Image } from 'react-native';
// import homeIcon from '../../assets/icons/Home-6-white.png'
// import soundIcon from '../../assets/icons/sound.png'
// import {HomeStack, SOSStack} from './Stack';

// /**
//  *
//  * TODO: remove top border from tab bar
//  */

// const Tab = createBottomTabNavigator();

// function Tabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: 'green',
//         // tabBarInactiveBackgroundColor: 'black',
//         tabBarStyle: {
//             backgroundColor: 'white'
//         },
//         tabBarShowLabel: false,
//         headerShown: false
//       }}
//     >
//       <Tab.Screen name={'Home'} component={HomeStack} options={{ tabBarIcon: ({focused}) => (
//         <Image source={homeIcon} style={{width: 25, tintColor: focused ? '#009444' : 'black', height: 25}} />
//       )}} />
//       <Tab.Screen name={'SOS'} component={SOSStack} options={{ tabBarIcon: ({focused}) => (
//         <Image source={soundIcon} style={{width: 25, tintColor: focused ? '#009444' : 'black', height: 25}} />
//       )}} />
//     </Tab.Navigator>
//   );
// }

// export default Tabs


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import communityIcon from '../../assets/icons/community.png';
import homeIcon from '../../assets/icons/Home-6-white.png'
import soundIcon from '../../assets/icons/sound.png'
import { HomeStack, SOSStack } from './Stack';
import CommunityPage from '../screens/CommunityPage';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#009444',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0, // Removes the top border
        },
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={homeIcon} 
              style={{
                width: 25, 
                height: 25, 
                tintColor: focused ? '#009444' : 'black'
              }} 
            />
          )
        }} 
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityPage} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={communityIcon} 
              style={{
                width: 25, 
                height: 25, 
                tintColor: focused ? '#009444' : 'black'
              }} 
            />
          )
        }} 
      />
      <Tab.Screen 
        name="SOS" 
        component={SOSStack} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={soundIcon} 
              style={{
                width: 25, 
                height: 25, 
                tintColor: focused ? '#009444' : 'black'
              }} 
            />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default Tabs;