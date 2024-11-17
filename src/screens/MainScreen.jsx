import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import HeaderCardCarousel from '../components/HeaderCardCarousel';
import { Feather } from '@expo/vector-icons';
import CommunitySection from '../components/CommunitySection';
import HelpButton from '../components/HelpButton';
import AppointmentSection from '../components/AppointmentSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    notificationContainer
  } = styles;

  const [displayTitle, setDisplayTitle] = useState('');
  const [displayDate, setDisplayDate] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [displayDoctorName, setDisplayDoctorName] = useState('');
  const [userEmail, setUserEmail] = useState('');

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
  console.log(
    appointmentTitle,
    appointmentDate,
    appointmentTime,
    appointmentDoctorName
  );

  //*   Retrieves the stored appointment data from AsyncStorage when the component mounts
  useEffect(() => {
    const getAppointment = async () => {
      try {
        const storedTitle = await AsyncStorage.getItem(APPOINTMENT_TITLE_KEY);
        const storedDate = await AsyncStorage.getItem(APPOINTMENT_DATE_KEY);
        const storedTime = await AsyncStorage.getItem(APPOINTMENT_TIME_KEY);
        const storedDoctorName = await AsyncStorage.getItem(
          APPOINTMENT_DOCTOR_KEY
        );

        // Sets the useState values for each to the stored Values
        if (storedTitle) setDisplayTitle(storedTitle);
        if (storedDate) setDisplayDate(formatDate(storedDate));
        if (storedTime) setDisplayTime(formatTime(storedTime));
        if (storedDoctorName) setDisplayDoctorName(storedDoctorName);
      } catch {
        console.log('Error getting appointment');
      }
    };
    getAppointment();
  }, []);

  //* Save the appointmentData in AsyncStorage if it comes from the navigation Params
  useEffect(() => {
    if (appointmentTitle) {
      setDisplayTitle(appointmentTitle);
      AsyncStorage.setItem(APPOINTMENT_TITLE_KEY, appointmentTitle);
    }
    if (appointmentDate) {
      const formattedDate = formatDate(appointmentDate);
      setDisplayDate(formattedDate);
      AsyncStorage.setItem(APPOINTMENT_DATE_KEY, appointmentDate);
    }
    if (appointmentTime) {
      const formattedTime = formatTime(appointmentTime);
      setDisplayTime(formattedTime);
      AsyncStorage.setItem(APPOINTMENT_TIME_KEY, appointmentTime);
    }
    if (appointmentDoctorName) {
      setDisplayDoctorName(appointmentDoctorName);
      AsyncStorage.setItem(APPOINTMENT_DOCTOR_KEY, appointmentDoctorName);
    } else {
      console.log(appointmentDoctorName);
    }
  }, [
    appointmentTitle,
    appointmentDate,
    appointmentTime,
    appointmentDoctorName,
  ]);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
          console.log('Email retrieved from AsyncStorage:', email);
        }
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };
    getEmail();
  }, []);

  return (
    <SafeAreaView style={wrapper}>
      {/* ----- main container ----- */}
      <View style={container}>
         {/* notification bell */}
         <View style={notificationContainer}>
            <Feather name="bell" size={24} color="black" />
        </View>
        {/* ----- header content ----- */}
        <View style={headerContainer}>
          <Text style={[baseText, headerText]}>SickleAid</Text>
          <Text style={[baseText, bodyText]}>Good Morning {userEmail} </Text>
        </View>
        <View style={carouselContainer}>
          <HeaderCardCarousel />
        </View>
        <View style={divider}></View>
        <AppointmentSection
          navigation={navigation}
          appointmentTitle={displayTitle}
          appointmentDate={displayDate}
          appointmentTime={displayTime}
          appointmentDoctorName={displayDoctorName}
        />
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
    paddingBottom: 20.98
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
