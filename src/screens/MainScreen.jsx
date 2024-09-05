import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import HeaderCardCarousel from '../components/HeaderCardCarousel';
import { Feather } from '@expo/vector-icons';
import CommunitySection from '../components/CommunitySection';
import HelpButton from '../components/HelpButton';
import AppointmentSection from '../components/AppointmentSection';

/**
 *
 * TODO: Change Gift to users name
 * TODO: Work on functionality for checkup
 * TODO: Clean up date and time code
 * Todo: Add functionality to help button
 * TODO: Clear appointment details when Done is clicked
 * TODO: Add notification bell to top of app
 * ? Why is the second divider darker than the first
 */
function MainScreen({ navigation, route }) {
  const {
    wrapper,
    baseText,
    headerText,
    bodyText,
    container,
    headerContainer,
    carouselContainer,
    divider,
    helpContainer,
  } = styles;

  const {appointmentTitle, appointmentDate, appointmentTime, appointmentDoctor} = route.params || {};

  return (
    <SafeAreaView style={wrapper}>
      {/* ----- main container ----- */}
      <View style={container}>
        {/* ----- header content ----- */}
        <View style={headerContainer}>
          <Text style={[baseText, headerText]}>SickleAid</Text>
          <Text style={[baseText, bodyText]}>Good Morning Gift</Text>
        </View>
        <View style={carouselContainer}>
          <HeaderCardCarousel />
        </View>
        <View style={divider}></View>
        <AppointmentSection navigation={navigation} route={{params:{appointmentTitle, appointmentDate, appointmentTime, appointmentDoctor}}} />
        <View style={divider}></View>
        <CommunitySection />
        <View style={helpContainer}>
          <HelpButton />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 64.98,
    paddingHorizontal: 21,
  },
  headerContainer: {
    alignSelf: 'flex-start',
    gap: 7,
  },
  carouselContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 26.09,
    maxHeight: 200,
  },
  baseText: {
    fontFamily: 'Inter',
  },
  headerText: {
    color: '#332E0E',
    fontSize: 36.279,
    fontWeight: 600,
  },
  bodyText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0.64,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#332e0e80',
    marginVertical: 10,
  },

  buttonTextStyle: {
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: 0.52,
    textAlign: 'center',
  },
  buttonSpacing: {
    paddingHorizontal: 19,
    paddingVertical: 5,
    backgroundColor: '#0B9444',
  },
  helpContainer: {
    marginTop: 10.35,
    alignSelf: 'flex-end',
  },
});

export default MainScreen;
