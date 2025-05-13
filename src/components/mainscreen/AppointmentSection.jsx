import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import ButtonComp from './Button';

function formatDisplayDate(isoString) {
  if (!isoString) return 'YY-MM-DD';
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDisplayTime(isoString) {
  if (!isoString) return '00:00';
  const date = new Date(isoString);
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
}

function AppointmentSection(props) {
  const {
    navigation,
    appointmentTitle,
    appointmentDate,
    appointmentTime,
    appointmentDoctorName,
    onDone,
  } = props;
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

  return (
    <View style={checkupContainer}>
      {/* ----- checkup information ----- */}
      <View>
        <Text style={[baseText, bodyText]}>
          {appointmentTitle ? appointmentTitle : 'Add an appointment'}
        </Text>
        <Text style={[baseText, checkupDateTime]}>
          {`${formatDisplayDate(appointmentDate)} | ${formatDisplayTime(appointmentTime)}`}
        </Text>
        <Text
          style={[baseText, checkupDoctor]}
        >{`With Dr ${appointmentDoctorName ? appointmentDoctorName : 'John Doe'}`}</Text>
      </View>
      {/* ----- checkup edit and done ----- */}
      <View style={checkupDoneContainer}>
        <TouchableOpacity
          style={iconContainer}
          onPress={() => navigation.navigate('SetAppointment', {
            title: appointmentTitle,
            date: appointmentDate,
            time: appointmentTime,
            doctor: appointmentDoctorName,
          })}
        >
          <Feather name="edit-2" size={14} color="black" />
        </TouchableOpacity>
        <ButtonComp
          buttonSpacing={buttonSpacing}
          buttonTextStyle={[baseText, buttonTextStyle, yellowButtonText]}
          buttonText={'Done'}
          onPress={onDone}
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
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB', // Light card background
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#0B9444', // Accent color
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
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.64,
  },
});
AppointmentSection.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  appointmentTitle: PropTypes.string,
  appointmentDate: PropTypes.string,
  appointmentTime: PropTypes.string,
  appointmentDoctorName: PropTypes.string,
  onDone: PropTypes.func.isRequired,
};

export default AppointmentSection;
