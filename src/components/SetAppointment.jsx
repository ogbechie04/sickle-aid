import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ButtonComp from './Button';

/**
 * TODO: Add functionality to SetAppointment
 * TODO: Add validation for form
 */

function SetAppointment({ navigation }) {
  const {
    wrapper,
    container,
    headingContainer,
    headerText,
    baseText,
    detailsContainer,
    inputContainer,
    input,
    buttonSpacing,
    buttonTextStyle,
  } = styles;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorsName, setDoctorsName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const addAppointment = () => {
    navigation.navigate('MainScreen', {
      appointmentTitle: title,
      appointmentDate: date.toISOString(),
      appointmentTime: time.toISOString(),
      appointmentDoctorName: doctorsName,
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    return date !== ''
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : '';
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setTime(time);
    hideDatePicker();
  };

  const getTime = () => {
    if (time instanceof Date) {
      let tempTime = time.toLocaleTimeString().split(':');
      return `${tempTime[0]}:${tempTime[1]}`;
    }
    return '';
  };

  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <View style={headingContainer}>
          <Feather
            name="chevron-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={[baseText, headerText]}>Set Reminder</Text>
        </View>
        <View style={detailsContainer}>
          {/* ----- REMINDER TITLE ----- */}
          <View style={inputContainer}>
            <TextInput
              style={[input, baseText]}
              placeholder="Reminder Title"
              placeholderTextColor={'#332E0E'}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          {/* ----- REMINDER DATE ----- */}
          <View style={inputContainer}>
            <TextInput
              style={[input, baseText]}
              placeholder="Date"
              placeholderTextColor={'#332E0E'}
              value={getDate()}
              editable={false}
              onPress={showDatePicker}
            />
            <Feather
              name="calendar"
              size={20}
              title="Set Date"
              onPress={showDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
            />
          </View>
          {/* ----- REMINDER TIME ----- */}
          <View style={inputContainer}>
            <TextInput
              style={[input, baseText]}
              placeholder="Time"
              placeholderTextColor={'#332E0E'}
              onPress={showTimePicker}
              value={getTime()}
              editable={false}
            />
            <Feather
              name="clock"
              size={20}
              title="Set Time"
              onPress={showTimePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
              is24Hour={true}
            />
          </View>
          {/* ----- DOCTORS NAME ----- */}
          <View style={inputContainer}>
            <TextInput
              style={[input, baseText]}
              placeholder="Dr, Name"
              placeholderTextColor={'#332E0E'}
              value={doctorsName}
              onChangeText={(text) => setDoctorsName(text)}
            />
          </View>
        </View>
        <ButtonComp
          buttonText={'Add'}
          buttonSpacing={buttonSpacing}
          buttonTextStyle={[buttonTextStyle, baseText]}
          onPress={addAppointment}
        />
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
    paddingHorizontal: 24,
    gap: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  baseText: {
    fontFamily: 'Inter',
  },
  headerText: {
    color: '#332E0E',
    fontSize: 20,
    fontWeight: 700,
  },
  detailsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    display: 'flex',
    width: '100%',
    fontSize: 13,
    letterSpacing: 0.52,
    color: '#332E0E',
    borderColor: '#332E0E',
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.64,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 600,
  },
  buttonSpacing: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#0B9444',
    width: '100%',
  },
});

export default SetAppointment;
