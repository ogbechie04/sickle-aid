import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import SetReminder from '../components/SetReminder'

const Stack = createStackNavigator()

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'MainScreen'} component={MainScreen} />
      <Stack.Screen name={'SetReminder'} component={SetReminder} />
    </Stack.Navigator>
  )
}

export default StackNavigator