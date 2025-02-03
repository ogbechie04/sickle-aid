import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderCardCarousel from '../components/HeaderCardCarousel';
import CommunitySection from '../components/CommunitySection';
import HelpButton from '../components/HelpButton';
import AppointmentSection from '../components/AppointmentSection';
import { formatDate, formatTime } from '../utils/formatDateTime';

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
    notificationContainer,
  } = styles;

  const [displayTitle, setDisplayTitle] = useState('');
  const [displayDate, setDisplayDate] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [displayDoctorName, setDisplayDoctorName] = useState('');
  const [username, setUserName] = useState('');
  const [showSetupPrompt, setShowSetupPrompt] = useState(false);

  const APPOINTMENT_TITLE_KEY = 'appointmentTitle';
  const APPOINTMENT_DATE_KEY = 'appointmentDate';
  const APPOINTMENT_TIME_KEY = 'appointmentTime';
  const APPOINTMENT_DOCTOR_KEY = 'appointmentDoctorName';

  const {
    appointmentTitle,
    appointmentDate,
    appointmentTime,
    appointmentDoctorName,
  } = route.params || {};

  // Retrieves the stored appointment data from AsyncStorage when component mounts
  useEffect(() => {
    const getAppointment = async () => {
      try {
        const storedTitle = await AsyncStorage.getItem(APPOINTMENT_TITLE_KEY);
        const storedDate = await AsyncStorage.getItem(APPOINTMENT_DATE_KEY);
        const storedTime = await AsyncStorage.getItem(APPOINTMENT_TIME_KEY);
        const storedDoctorName = await AsyncStorage.getItem(
          APPOINTMENT_DOCTOR_KEY
        );

        // Set state based on stored values
        if (storedTitle) setDisplayTitle(storedTitle);
        if (storedDate) setDisplayDate(formatDate(storedDate));
        if (storedTime) setDisplayTime(formatTime(storedTime));
        if (storedDoctorName) setDisplayDoctorName(storedDoctorName);
      } catch (error) {
        console.error('Error retrieving appointment:', error);
      }
    };
    getAppointment();
  }, []);

  // Save appointment data in AsyncStorage if they come from route params
  useEffect(() => {
    if (appointmentTitle) {
      setDisplayTitle(appointmentTitle);
      AsyncStorage.setItem(APPOINTMENT_TITLE_KEY, appointmentTitle).catch(
        (error) => console.error('Error saving appointment title:', error)
      );
    }
    if (appointmentDate) {
      const formattedDate = formatDate(appointmentDate);
      setDisplayDate(formattedDate);
      AsyncStorage.setItem(APPOINTMENT_DATE_KEY, appointmentDate).catch(
        (error) => console.error('Error saving appointment date:', error)
      );
    }
    if (appointmentTime) {
      const formattedTime = formatTime(appointmentTime);
      setDisplayTime(formattedTime);
      AsyncStorage.setItem(APPOINTMENT_TIME_KEY, appointmentTime).catch(
        (error) => console.error('Error saving appointment time:', error)
      );
    }
    if (appointmentDoctorName) {
      setDisplayDoctorName(appointmentDoctorName);
      AsyncStorage.setItem(APPOINTMENT_DOCTOR_KEY, appointmentDoctorName).catch(
        (error) => console.error('Error saving doctor name:', error)
      );
    }
  }, [
    appointmentTitle,
    appointmentDate,
    appointmentTime,
    appointmentDoctorName,
  ]);

  // Fetch username from AsyncStorage
  useEffect(() => {
    const getUser = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username !== null) {
          setUserName(username);
        }
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    };
    getUser();
  }, []);

  // Check if user has set up an SOS location
  useEffect(() => {
    const checkSOSSetup = async () => {
      try {
        const hasSetupSOS = await AsyncStorage.getItem('sosSetup');
        if (hasSetupSOS === null) {
          setShowSetupPrompt(true);
        }
      } catch (error) {
        console.error('Error checking SOS setup:', error);
      }
    };
    checkSOSSetup();
  }, []);

  const handleSetupComplete = async () => {
    try {
      await AsyncStorage.setItem('sosSetup', 'true'); // Save that SOS is set up
      setShowSetupPrompt(false);
      navigation.navigate('SOS'); // Navigate to setup page
    } catch (error) {
      console.error('Error completing SOS setup:', error);
    }
  };

  return (
    <SafeAreaView style={wrapper}>
      <Modal visible={showSetupPrompt} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Set Up SOS Location
            </Text>
            <Text style={{ marginVertical: 10 }}>
              Please set up your SOS location to continue using the app.
            </Text>
            <Button title="Set Up Now" onPress={handleSetupComplete} />
          </View>
        </View>
      </Modal>

      <View style={container}>
        <View style={notificationContainer}>
          <Feather name="bell" size={24} color="black" />
        </View>

        <View style={headerContainer}>
          <Text style={[baseText, headerText]}>SickleAid</Text>
          <Text style={[baseText, bodyText]}>Good Morning {username} </Text>
        </View>

        <View style={carouselContainer}>
          <HeaderCardCarousel />
        </View>

        <View style={divider}></View>

        {displayTitle && displayDate && displayTime && displayDoctorName ? (
          <AppointmentSection
            navigation={navigation}
            appointmentTitle={displayTitle}
            appointmentDate={displayDate}
            appointmentTime={displayTime}
            appointmentDoctorName={displayDoctorName}
          />
        ) : (
          <Text>No appointment details available.</Text>
        )}

        <View style={divider}></View>
        <CommunitySection />

        <View style={helpContainer}>
          <HelpButton navigation={navigation} />
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
    paddingTop: 20,
    paddingHorizontal: 21,
  },
  notificationContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 20.98,
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
MainScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default MainScreen;
