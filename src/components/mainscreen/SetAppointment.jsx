import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ButtonComp from './Button';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * TODO: Add functionality to SetAppointment
 * TODO: Add validation for form
 */

function SetAppointment({ navigation }) {
  const route = useRoute();
  const { title, date, time, doctor } = route.params || {};

  // Log the incoming time param
  console.log('Incoming time param:', time);

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

  const [reminderTitle, setReminderTitle] = React.useState(title || '');
  const [reminderDate, setReminderDate] = React.useState(date ? new Date(date) : '');
  const [reminderTime, setReminderTime] = React.useState(time ? new Date(time) : '');
  const [doctorsName, setDoctorsName] = React.useState(doctor || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Log the state after initialization
  React.useEffect(() => {
    console.log('reminderTime state after init:', reminderTime);
  }, []);

  // Log the state whenever reminderTime changes
  React.useEffect(() => {
    console.log('reminderTime updated:', reminderTime);
  }, [reminderTime]);

  const addAppointment = async () => {
    const newAppointment = {
      title: reminderTitle,
      date: reminderDate ? reminderDate.toISOString() : '',
      time: reminderTime ? reminderTime.toISOString() : '',
      doctor: doctorsName,
    };

    try {
      const stored = await AsyncStorage.getItem('appointments');
      const appointments = stored ? JSON.parse(stored) : [];
      appointments.push(newAppointment);
      await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setReminderDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    if (reminderDate && reminderDate instanceof Date && !isNaN(reminderDate)) {
      let tempDate = reminderDate.toDateString().split(' ');
      return `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`;
    }
    return '';
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setReminderTime(time);
    hideTimePicker();
  };

  const getTime = () => {
    if (reminderTime && reminderTime instanceof Date && !isNaN(reminderTime)) {
      let tempTime = reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return tempTime;
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
              placeholderTextColor="#888"
              value={reminderTitle}
              onChangeText={setReminderTitle}
            />
          </View>
          {/* ----- REMINDER DATE ----- */}
          <View style={inputContainer}>
            <TouchableOpacity style={{ flex: 1 }} onPress={showDatePicker}>
              <Text style={[input, baseText, { color: reminderDate ? '#332E0E' : 'grey' }]}>
                {getDate() || 'Date'}
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity style={{ flex: 1 }} onPress={showTimePicker}>
              <Text style={[input, baseText, { color: reminderTime ? '#332E0E' : 'grey' }]}>
                {getTime() || 'Time'}
              </Text>
            </TouchableOpacity>
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
              placeholderTextColor="#888"
              value={doctorsName}
              onChangeText={setDoctorsName}
            />
          </View>
        </View>
        <ButtonComp
          buttonText={title ? 'Update' : 'Add'}
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
    paddingLeft: 10,
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
    height: 40,
    textAlignVertical: 'center',
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
SetAppointment.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SetAppointment;

