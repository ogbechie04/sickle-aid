import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import SetAppointment from '../components/SetAppointment'
import SosScreen from '../screens/SosScreen'

const Stack = createStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'MainScreen'} component={MainScreen} />
      <Stack.Screen name={'SetAppointment'} component={SetAppointment} />
      <Stack.Screen name={'SosScreen'} component={SosScreen} />
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

export { HomeStack, SOSStack }