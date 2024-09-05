import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ButtonComp from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate, formatTime } from '../utils/formatDateTime';

function AppointmentSection(props) {
  const { navigation, route } = props;
  const {
    checkupContainer,
    checkupDateTime,
    checkupDoctor,
    iconContainer,
    buttonTextStyle,
    buttonSpacing,
    checkupDoneContainer,
    yellowButtonText,
    baseText,
    bodyText,
  } = styles;

  const [displayTitle, setDisplayTitle] = useState('');
  const [displayDate, setDisplayDate] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [displayDoctorName, setDisplayDoctorName] = useState('');

  const APPOINTMENT_TITLE_KEY = 'appointmentTitle';
  const APPOINTMENT_DATE_KEY = 'appointmentDate';
  const APPOINTMENT_TIME_KEY = 'appointmentTime';
  const APPOINTMENT_DOCTOR_KEY = 'appointmentDoctor';

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
      AsyncStorage.setItem(APPOINTMENT_DATE_KEY, appointmentDate)
    }
    if (appointmentTime) {
        const formattedTime = formatTime(appointmentTime);
        setDisplayTime(formattedTime)
        AsyncStorage.setItem(APPOINTMENT_TIME_KEY, appointmentTime)
    }
    if (appointmentDoctorName) {
        setDisplayDoctorName(appointmentDoctorName)
        AsyncStorage.setItem(APPOINTMENT_DOCTOR_KEY, appointmentDoctorName)
        console.log(appointmentDoctorName)
    }
  }, [appointmentTitle, appointmentDate, appointmentTime, appointmentDoctorName]);
  //   console.log(appointmentTitle, appointmentDate, appointmentTime, appointmentDoctor);

  //   const date = new Date(appointmentDate);
  //   const tempDate = date.toLocaleDateString().split('/');
  //   const displayDate = `${tempDate[2]}-${tempDate[0]}-${tempDate[1]}`;

  //   const time = new Date(appointmentTime);
  //   const tempTime = time.toLocaleTimeString().split(':');
  //   const displayTime = `${tempTime[0]}:${tempTime[1]}`;
  //   console.log(tempTime);
  //   console.log(displayTime);

  return (
    <View style={checkupContainer}>
      {/* ----- checkup information ----- */}
      <View>
        <Text style={[baseText, bodyText]}>
          {appointmentTitle ? displayTitle : 'Add an appointment'}
        </Text>
        <Text
          style={[baseText, checkupDateTime]}
        >{`${appointmentDate ? displayDate : 'YY-MM-DD'} | ${appointmentTime ? displayTime : '00:00'}`}</Text>
        <Text
          style={[baseText, checkupDoctor]}
        >{`With Dr ${appointmentDoctorName ? displayDoctorName : 'John Doe'}`}</Text>
      </View>
      {/* ----- checkup edit and done ----- */}
      <View style={checkupDoneContainer}>
        <TouchableOpacity
          style={iconContainer}
          onPress={() => navigation.navigate('SetAppointment')}
        >
          <Feather name="edit-2" size={14} color="black" />
        </TouchableOpacity>
        <ButtonComp
          buttonSpacing={buttonSpacing}
          buttonTextStyle={[baseText, buttonTextStyle, yellowButtonText]}
          buttonText={'Done'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //* ----- checkout section ----- */
  checkupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // borderWidth: 5,
    alignItems: 'center',
  },
  checkupDateTime: {
    fontSize: 12,
    color: '#332E0E',
    marginTop: 4,
  },
  checkupDoctor: {
    fontSize: 13,
    color: '#332E0E',
    marginTop: 7,
    letterSpacing: 0.52,
  },
  checkupDoneContainer: {
    justifyContent: 'space-between',
    gap: 18,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    alignSelf: 'flex-end',
  },
  yellowButtonText: {
    color: '#FFFADE',
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
  baseText: {
    fontFamily: 'Inter',
  },
  bodyText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0.64,
  },
});

export default AppointmentSection;
