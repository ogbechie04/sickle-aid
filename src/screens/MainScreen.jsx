import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Button,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import HeaderCardCarousel from '../components/mainscreen/HeaderCardCarousel';
import CommunitySection from '../components/mainscreen/CommunitySection';
import HelpButton from '../components/mainscreen/HelpButton';
import AppointmentSection from '../components/mainscreen/AppointmentSection';
import ButtonComp from '../components/mainscreen/Button';

/**
 *

 * TODO: Clear appointment details when Done is clicked
 * TODO: Add notification bell to top of app
 */
function MainScreen({ navigation }) {
  const {
    wrapper,
    baseText,
    headerText,
    container,
    headerContainer,
    carouselContainer,
    divider,
    helpContainer,
  } = styles;

  const [username, setUserName] = useState('');
  const [showSetupPrompt, setShowSetupPrompt] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [showAll] = useState(false);
  const [userId, setUserId] = useState(null);
  const [locations, setLocations] = useState([]);

  // Fetch username from AsyncStorage
  useEffect(() => {
    const getUser = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.user && userData.user.username) {
            setUserName(userData.user.username);
          }
          setUserId(userData?.user?._id || null);
          setLocations(userData?.user?.locations || []);
          console.log('User ID:', userData?.user?._id);
          console.log('Locations:', userData?.user?.locations || []);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
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

  useFocusEffect(
    React.useCallback(() => {
      const getAppointments = async () => {
        try {
          const stored = await AsyncStorage.getItem('appointments');
          setAppointments(stored ? JSON.parse(stored) : []);
        } catch (error) {
          console.error('Error retrieving appointments:', error);
        }
      };
      getAppointments();
    }, [])
  );

  const handleSetupComplete = async () => {
    try {
      await AsyncStorage.setItem('sosSetup', 'true'); // Save that SOS is set up
      setShowSetupPrompt(false);
      navigation.navigate('SOS'); // Navigate to setup page
    } catch (error) {
      console.error('Error completing SOS setup:', error);
    }
  };

  const handleDone = async (index) => {
    try {
      const updatedAppointments = [...appointments];
      updatedAppointments.splice(index, 1);
      setAppointments(updatedAppointments);
      await AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    } catch (error) {
      console.error('Error removing appointment:', error);
    }
  };

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  const firstName = username ? username.split(' ')[0] : '';

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

      <ScrollView contentContainerStyle={container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={[baseText, headerText]}>SickleAid</Text>
          <Feather name="bell" size={24} color="black" style={styles.bellIcon} />
        </View>

        <View style={headerContainer}>
          <Text style={styles.greetingText}>
            {getGreeting()}{firstName ? `, ${firstName}` : ''}
          </Text>
        </View>

        <View style={carouselContainer}>
          <HeaderCardCarousel />
        </View>

        <View style={divider}></View>

        {appointments.length === 0 ? (
          <View style={{ alignItems: 'center', marginVertical: 32 }}>
            <Text style={{ color: '#888', fontSize: 16, marginBottom: 16 }}>
              No appointments yet. Set up one today!
            </Text>
            <ButtonComp
              buttonText="Add an Appointment"
              buttonSpacing={[styles.buttonSpacing, { backgroundColor: '#FFB703' }]}
              buttonTextStyle={[styles.buttonTextStyle, { color: '#332E0E' }]}
              onPress={() => navigation.navigate('SetAppointment')}
            />
          </View>
        ) : (
          <>
            {(showAll ? appointments : appointments.slice(0, 2)).map((appt, idx) => (
              <React.Fragment key={idx}>
                <AppointmentSection
                  navigation={navigation}
                  appointmentTitle={appt.title}
                  appointmentDate={appt.date}
                  appointmentTime={appt.time}
                  appointmentDoctorName={appt.doctor}
                  onEdit={() =>
                    navigation.navigate('SetAppointment', {
                      title: appt.title,
                      date: appt.date,
                      time: appt.time,
                      doctor: appt.doctor,
                    })
                  }
                  onDone={() => handleDone(idx)}
                  style={{ marginBottom: 16 }}
                />
                {appointments.length > 2 && !showAll && idx === 1 && (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
                    <ButtonComp
                      buttonText="View All Appointments"
                      buttonSpacing={[styles.buttonSpacing, { backgroundColor: '#2196F3' }]}
                      buttonTextStyle={[styles.buttonTextStyle, { color: '#fff' }]}
                      onPress={() => navigation.navigate('AllAppointmentsScreen')}
                    />
                    <ButtonComp
                      buttonText="Add an Appointment"
                      buttonSpacing={[styles.buttonSpacing, { backgroundColor: '#FFB703' }]}
                      buttonTextStyle={[styles.buttonTextStyle, { color: '#332E0E' }]}
                      onPress={() => navigation.navigate('SetAppointment')}
                    />
                  </View>
                )}
              </React.Fragment>
            ))}
            {showAll && (
              <ButtonComp
                buttonText="Add an Appointment"
                buttonSpacing={[styles.buttonSpacing, { backgroundColor: '#FFB703' }]}
                buttonTextStyle={[styles.buttonTextStyle, { color: '#332E0E' }]}
                onPress={() => navigation.navigate('SetAppointment')}
              />
            )}
            {appointments.length <= 2 && (
              <ButtonComp
                buttonText="Add an Appointment"
                buttonSpacing={[styles.buttonSpacing, { backgroundColor: '#FFB703', marginTop: 10 }]}
                buttonTextStyle={[styles.buttonTextStyle, { color: '#332E0E' }]}
                onPress={() => navigation.navigate('SetAppointment')}
              />
            )}
          </>
        )}

        <View style={divider}></View>
        <CommunitySection />

        <View style={helpContainer}>
          <HelpButton navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 21,
  },
  notificationContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 20.98,
    marginTop: StatusBar.currentHeight || 0,
  },
  headerContainer: {
    alignSelf: 'flex-start',
    gap: 7,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  bellIcon: {
    marginRight: 10,
  },
  carouselContainer: {
    width: '100%',
    // flex: 1,
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
    marginTop: 30,
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
  greetingText: {
    color: '#332E0E',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
MainScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default MainScreen;
