// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import MainScreen from '../screens/MainScreen'
// import SetAppointment from '../components/SetAppointment'
// import SosScreen from '../screens/SosScreen'
// import OnboardingScreen from '../screens/OnboardingScreen'
// import LovedOnesScreen from '../screens/LovedOnesScreen'
// import CommunityScreen from '../screens/CommunityScreen'
// import SignUpScreen from '../screens/SignupScreen'
// import SignInScreen from '../screens/SigninScreen'
// // import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen'
// import PasswordResetScreen from '../screens/PasswordResetScreen'
// import SignInOptionsScreen from '../screens/SigninOptions'
// import PersonalInfoScreen from '../screens/PersonalInfoScreen'



// const Stack = createStackNavigator()

// function OnboardingStack() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
//       <Stack.Screen name={'LovedOnes'} component={LovedOnesScreen} />
//       <Stack.Screen name={'Communityscreen'} component={CommunityScreen} />
//       <Stack.Screen name={'SignUp'} component={SignUpScreen} />
//       <Stack.Screen name={'SignIn'} component={SignInScreen} />
//       {/* <Stack.Screen name={'PasswordRecovery'} component={PasswordRecoveryScreen} /> */}
//       <Stack.Screen name={'PasswordReset'} component={PasswordResetScreen} />
//       <Stack.Screen name={'SignInOptions'} component={SignInOptionsScreen} />
//       <Stack.Screen name={'PersonalInfo'} component={PersonalInfoScreen} />
//     </Stack.Navigator>
//   )
// }

// function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name={'MainScreen'} component={MainScreen} />
//       <Stack.Screen name={'SetAppointment'} component={SetAppointment} />
//     </Stack.Navigator>
//   )
// }

// function SOSStack() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name={'SosScreen'} component={SosScreen} />
//       {/* <Stack.Screen name={'MainScreen'} component={MainScreen} /> */}
//       {/* <Stack.Screen name={'SetAppointment'} component={SetAppointment} /> */}
//     </Stack.Navigator>
//   )
// }

// export { OnboardingStack, HomeStack, SOSStack }

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs'; 
import OnboardingScreen from '../screens/OnboardingScreen';
import LovedOnesScreen from '../screens/LovedOnesScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SignUpScreen from '../screens/SignupScreen';
import SignInScreen from '../screens/SigninScreen';
import CheckEmail from '../screens/checkEmail';
import UpdatePassword from '../screens/updatePassword';
import SignInOptionsScreen from '../screens/SigninOptions';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';


const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LovedOnes" component={LovedOnesScreen} />
      <Stack.Screen name="Communityscreen" component={CommunityScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="PasswordReset" component={UpdatePassword} />
      <Stack.Screen name="emailcheck" component={CheckEmail} />
      <Stack.Screen name="SignInOptions" component={SignInOptionsScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="MainApp" component={Tabs} />
    </Stack.Navigator>
  );
}

export { MainStack };