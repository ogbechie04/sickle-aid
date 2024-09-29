import React from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import ButtonComp from './src/components/button';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'
import HeaderCard from './src/components/HeaderCard'
import HeaderCardCarousel from './src/components/HeaderCardCarousel'

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
      {<HeaderCard />}
      {<HeaderCardCarousel />}
    </NavigationContainer>
  )
}

export default App

// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import OnboardingScreen from './src/screens/OnboardingScreen'
// import LovedOnesScreen from './src/screens/LovedOnesScreen'
// import CommunityScreen from './src/screens/CommunityScreen'
// import SignUpScreen from './src/screens/SignupScreen'
// import SignInScreen from './src/screens/SigninScreen'
// import PasswordRecoveryScreen from './src/screens/PasswordSecurityScreen'
// import PasswordResetScreen from './src/screens/PasswordResetScreen'
// import SignInOptionsScreen from './src/screens/SigninOptions'
// import PersonalInfoScreen from './src/screens/PersonalInfoScreen'

// const Stack = createStackNavigator()

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Onboarding">
//         <Stack.Screen
//           name="Onboarding"
//           component={OnboardingScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="LovedOnes"
//           component={LovedOnesScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Communityscreen"
//           component={CommunityScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUpScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SignIn"
//           component={SignInScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="PasswordRecovery"
//           component={PasswordRecoveryScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="PasswordReset"
//           component={PasswordResetScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SignInOptions"
//           component={SignInOptionsScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="PersonalInfo"
//           component={PersonalInfoScreen}
//           options={{ headerShown: false }}
//         />
//         {/* Add other screens here */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App
