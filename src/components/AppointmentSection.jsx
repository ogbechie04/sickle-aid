import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ButtonComp from './Button';

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

  const { appointmentTitle, appointmentDate, appointmentTime, appointmentDoctor } =
    route.params || {};
  console.log(appointmentTitle, appointmentDate, appointmentTime, appointmentDoctor);

  const date = new Date(appointmentDate);
  const tempDate = date.toLocaleDateString().split('/');
  const displayDate = `${tempDate[2]}-${tempDate[0]}-${tempDate[1]}`;

  const time = new Date(appointmentTime);
  const tempTime = time.toLocaleTimeString().split(':');
  const displayTime = `${tempTime[0]}:${tempTime[1]}`;
  console.log(tempTime);
  console.log(displayTime);

  return (
    <View style={checkupContainer}>
      {/* ----- checkup information ----- */}
      <View>
        <Text style={[baseText, bodyText]}>
          {appointmentTitle ? appointmentTitle : 'Add an appointment'}
        </Text>
        <Text
          style={[baseText, checkupDateTime]}
        >{`${appointmentDate ? displayDate : 'YY-MM-DD'} | ${appointmentTime ? displayTime : '00:00'}`}</Text>
        <Text
          style={[baseText, checkupDoctor]}
        >{`With Dr ${appointmentDoctor ? appointmentDoctor : 'John Doe'}`}</Text>
      </View>
      {/* ----- checkup edit and done ----- */}
      <View style={checkupDoneContainer}>
        <TouchableOpacity
          style={iconContainer}
          onPress={() => navigation.navigate('Setappointment')}
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
