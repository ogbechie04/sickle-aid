import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import SetAppointment from '../components/SetAppointment'

const Stack = createStackNavigator()

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'MainScreen'} component={MainScreen} />
      <Stack.Screen name={'SetAppointment'} component={SetAppointment} />
    </Stack.Navigator>
  )
}

export default StackNavigator