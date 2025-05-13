import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppointmentSection from '../components/mainscreen/AppointmentSection';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';

function AllAppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const stored = await AsyncStorage.getItem('appointments');
        setAppointments(stored ? JSON.parse(stored) : []);
      } catch (error) {
        console.error('Error retrieving appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

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

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#0B9444" />
        </TouchableOpacity>
        <Text style={styles.title}>All Appointments</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {appointments.length === 0 ? (
          <Text style={styles.emptyText}>No appointments found.</Text>
        ) : (
          appointments.map((appt, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <View style={styles.divider} />}
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
              />
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    color: '#0B9444',
    marginRight: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#332E0E',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
AllAppointmentsScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AllAppointmentsScreen;
