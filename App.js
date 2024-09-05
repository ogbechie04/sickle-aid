import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import ButtonComp from './src/components/button';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';
import HeaderCard from './src/components/HeaderCard';
import HeaderCardCarousel from './src/components/HeaderCardCarousel';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
      {/* <HeaderCard /> */}
      {/* <HeaderCardCarousel /> */}
    </NavigationContainer>
  );
}

