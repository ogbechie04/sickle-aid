import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Import your screen components
import MainScreen from '../screens/MainScreen';
import SetAppointment from '../components/SetAppointment';
import SosScreen from '../screens/SosScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LovedOnesScreen from '../screens/LovedOnesScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SignUpScreen from '../screens/SignupScreen';
import SignInScreen from '../screens/SigninScreen';
import SignInOptionsScreen from '../screens/SigninOptions';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import CheckEmail from '../screens/checkEmail';
import UpdatePassword from '../screens/updatePassword';
import HospitalInformation from '../screens/HospitalInformationScreen';
import OfficeInformation from '../screens/OfficeInformationScreen';

// Import your icons
import homeIcon from '../../assets/icons/Home-6-white.png';
import soundIcon from '../../assets/icons/sound.png';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="SetAppointment" component={SetAppointment} />
    </Stack.Navigator>
  );
}

function SOSStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SosScreen" component={SosScreen} />
      <Stack.Screen name="HospitalInformation" component={HospitalInformation} />
      <Stack.Screen name="OfficeInformation" component={OfficeInformation} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#009444',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        headerShown: false,
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
                tintColor: focused ? '#009444' : 'black',
              }}
            />
          ),
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
                tintColor: focused ? '#009444' : 'black',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LovedOnes" component={LovedOnesScreen} />
      <Stack.Screen name="Communityscreen" component={CommunityScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="PasswordReset" component={UpdatePassword} />
      <Stack.Screen name="emailcheck" component={CheckEmail} />
      <Stack.Screen name="SignInOptions" component={SignInOptionsScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export { RootNavigator };
