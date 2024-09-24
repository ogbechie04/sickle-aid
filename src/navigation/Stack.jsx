import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import SetAppointment from '../components/SetAppointment'
import SosScreen from '../screens/SosScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
import LovedOnesScreen from '../screens/LovedOnesScreen'

const Stack = createStackNavigator()

function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
      <Stack.Screen name={'LovedOnes'} component={LovedOnesScreen} />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'MainScreen'} component={MainScreen} />
      <Stack.Screen name={'SetAppointment'} component={SetAppointment} />
    </Stack.Navigator>
  )
}

function SOSStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'SosScreen'} component={SosScreen} />
      {/* <Stack.Screen name={'MainScreen'} component={MainScreen} /> */}
      {/* <Stack.Screen name={'SetAppointment'} component={SetAppointment} /> */}
    </Stack.Navigator>
  )
}

export { OnboardingStack, HomeStack, SOSStack }