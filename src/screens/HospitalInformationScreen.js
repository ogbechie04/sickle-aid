import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PropTypes from 'prop-types';
import Feather from '@expo/vector-icons/Feather';
import API_URL from '../config/api';

function HospitalSetupScreen({ navigation }) {
  // API Service
  const API = {
    baseURL: API_URL || 'http://localhost:5000',

    async getHospital(userId) {
      return axios.get(`${API.baseURL}/get-hospital/${userId}`);
    },

    async saveHospital(data) {
      return axios.post(`${API.baseURL}/save-hospital`, data);
    },

    async updateHospital(data) {
      return axios.put(`${API.baseURL}/update-hospital`, data);
    },

    async sendSOSAlert(userId) {
      return axios.post(`${API.baseURL}/send-sos-alert/${userId}`);
    },
  };

  // State
  const [errors, setErrors] = useState({
    hospitalName: '',
    hospitalAddress: '',
    patientId: '',
    hospitalNumber: '',
  });

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [patientId, setPatientId] = useState('');
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load initial data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          Alert.alert('Error', 'User session not found');
          return;
        }

        setUserId(storedUserId);
        setIsLoading(true);

        const response = await API.getHospital(storedUserId);
        if (response.data) {
          const { hospitalName, hospitalAddress, patientId, hospitalNumber } =
            response.data;
          setHospitalName(hospitalName || '');
          setHospitalAddress(hospitalAddress || '');
          setPatientId(patientId ? String(patientId) : '');
          setHospitalNumber(hospitalNumber ? String(hospitalNumber) : '');
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching hospital info:', error);
        Alert.alert(
          'Error',
          'Failed to load hospital information. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      hospitalName: '',
      hospitalAddress: '',
      patientId: '',
      hospitalNumber: '',
    };

    let isValid = true;

    if (!hospitalName.trim()) {
      newErrors.hospitalName = 'Hospital name is required';
      isValid = false;
    }

    if (!hospitalAddress.trim()) {
      newErrors.hospitalAddress = 'Hospital address is required';
      isValid = false;
    }

    if (patientId && isNaN(Number(patientId))) {
      newErrors.patientId = 'Patient ID must be a number';
      isValid = false;
    }

    if (hospitalNumber && isNaN(Number(hospitalNumber))) {
      newErrors.hospitalNumber = 'Hospital number must be a number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle field changes
  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'hospitalName':
        setHospitalName(value);
        setErrors((prev) => ({ ...prev, hospitalName: '' }));
        break;
      case 'hospitalAddress':
        setHospitalAddress(value);
        setErrors((prev) => ({ ...prev, hospitalAddress: '' }));
        break;
      case 'patientId':
        setPatientId(value);
        setErrors((prev) => ({ ...prev, patientId: '' }));
        break;
      case 'hospitalNumber':
        setHospitalNumber(value);
        setErrors((prev) => ({ ...prev, hospitalNumber: '' }));
        break;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User session not found');
      return;
    }

    const hospitalInfo = {
      userId,
      hospitalName: hospitalName.trim(),
      hospitalAddress: hospitalAddress.trim(),
      patientId: patientId ? Number(patientId) : null,
      hospitalNumber: hospitalNumber ? Number(hospitalNumber) : null,
    };

    setIsLoading(true);
    try {
      if (isEditing) {
        await API.updateHospital(hospitalInfo);
      } else {
        await API.saveHospital(hospitalInfo);
      }

      Alert.alert('Success', 'Hospital information saved successfully', [
        { text: 'OK', onPress: () => navigation.navigate('SosScreen') },
      ]);
    } catch (error) {
      console.error('Error saving hospital info:', error);
      Alert.alert(
        'Error',
        'Failed to save hospital information. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSOSAlert = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await API.sendSOSAlert(userId);
      if (response.status === 200) {
        Alert.alert('Success', 'SOS alert has been sent to the hospital');
      }
    } catch (err) {
      console.error(err);
      setError('There was an error sending the SOS alert');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="forestgreen" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Hospital Information</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.hospitalName ? styles.inputError : null,
              ]}
              placeholder="Hospital Name"
              value={hospitalName}
              onChangeText={(value) => handleFieldChange('hospitalName', value)}
            />
            {errors.hospitalName ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.hospitalName}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.hospitalAddress ? styles.inputError : null,
              ]}
              placeholder="Hospital Address"
              value={hospitalAddress}
              onChangeText={(value) =>
                handleFieldChange('hospitalAddress', value)
              }
              multiline
            />
            {errors.hospitalAddress ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.hospitalAddress}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.patientId ? styles.inputError : null,
              ]}
              placeholder="Patient ID (Optional)"
              value={patientId}
              onChangeText={(value) => handleFieldChange('patientId', value)}
              keyboardType="numeric"
            />
            {errors.patientId ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.patientId}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.hospitalNumber ? styles.inputError : null,
              ]}
              placeholder="Hospital Number (Optional)"
              value={hospitalNumber}
              onChangeText={(value) =>
                handleFieldChange('hospitalNumber', value)
              }
              keyboardType="numeric"
            />
            {errors.hospitalNumber ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.hospitalNumber}</Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            disabled={loading}
            style={[styles.button, styles.helpButton]}
            onPress={handleSOSAlert}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Sending SOS...' : 'Send SOS Alert'}
            </Text>
          </TouchableOpacity>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isEditing ? 'Update Information' : 'Save Information'}
            </Text>
          </TouchableOpacity>
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
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorContainer: {
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'forestgreen',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  helpButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

HospitalSetupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default HospitalSetupScreen;
