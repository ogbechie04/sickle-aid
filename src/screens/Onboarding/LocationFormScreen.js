import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Added axios import
import  API_URL  from '../../config/api'; // Added API_URL import

const LOCATION_TITLES = [
  { label: 'Home', value: 'home', icon: 'home-outline' },
  { label: 'Office', value: 'office', icon: 'briefcase-outline' },
  { label: 'Custom', value: 'custom', icon: 'location-outline' },
];

const LocationFormScreen = ({ navigation, route }) => {
  const { locationType = 'primary' } = route.params || {};
  const [title, setTitle] = useState('');
  const [landmark, setLandmark] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [address, setAddress] = useState('');
  const [localGovernment, setLocalGovernment] = useState('');
  const [customName, setCustomName] = useState('');
  // Add hospital info state
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [patientId, setPatientId] = useState('');

  const handleSubmit = async () => {
    if (
      !title ||
      !landmark ||
      !address ||
      !localGovernment ||
      (title === 'custom' && !customName)
    ) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const payload = {
      locationType,
      title,
      customName: title === 'custom' ? customName : '',
      landmark,
      flatNumber,
      address,
      localGovernment,
      state: 'Lagos',
      hospitalName, // optional
      hospitalAddress, // optional
      patientId, // optional
    };

    console.log('Location payload to backend:', payload);

    try {
      // Get userId from AsyncStorage
      const userDataString = await AsyncStorage.getItem('user');
      // const user = userDataString ? JSON.parse(userDataString) : {};
      const userId = await AsyncStorage.getItem('userId');
      // console.log('userDataString:', userDataString);
      // console.log('user:', user);
      console.log('User ID:', userId);
      if (!userId) {
        Alert.alert('Error', 'User ID not found. Please log in again.');
        navigation.navigate('SignIn');
        return;
      }

      // Send location to backend
      const response = await axios.post(`${API_URL}/save-hospital`, {
        userId,
        locations: [payload],
      });
      console.log('Response:', response);
      if (response.data.message === 'Hospital information saved successfully') {
        // Store hospitalInfo in AsyncStorage
        await AsyncStorage.setItem('hospitalInfo', JSON.stringify(response.data.hospitalInfo));
        Alert.alert('Success', `${locationType} location saved successfully!`, [
          {
            text: 'OK',
            onPress: () => {
              // Reset form fields
              setTitle('');
              setLandmark('');
              setFlatNumber('');
              setAddress('');
              setLocalGovernment('');
              setCustomName('');
              setHospitalName('');
              setHospitalAddress('');
              setPatientId('');
              if (locationType === 'primary') {
                navigation.navigate('LocationForm', { locationType: 'secondary' });
              } else {
                navigation.navigate('MainApp');
              }
            },
          },
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to save location.');
      }
    } catch (e) {
      console.error('Failed to save location:', e);
      Alert.alert('Error', 'Failed to save location. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            {locationType === 'primary'
              ? 'Primary Location'
              : 'Secondary Location'}
          </Text>
          <Text style={styles.subtitle}>
            {locationType === 'primary'
              ? 'Where do you spend most of your day?'
              : 'Add another important location'}
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.titleOptionsContainer}>
            {LOCATION_TITLES.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.titleOption,
                  title === option.value && styles.selectedTitleOption,
                ]}
                onPress={() => setTitle(option.value)}
              >
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={title === option.value ? '#fff' : 'forestgreen'}
                  style={styles.titleIcon}
                />
                <Text
                  style={[
                    styles.titleOptionText,
                    title === option.value && styles.selectedTitleOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Move the custom name input here */}
          {title === 'custom' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name this location *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Gym, Hospital, Aunt’s House"
                placeholderTextColor="#999"
                value={customName}
                onChangeText={setCustomName}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Landmark *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Near City Mall"
              placeholderTextColor="#999"
              value={landmark}
              onChangeText={setLandmark}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flat/House Number</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Flat 2B, House 15"
              placeholderTextColor="#999"
              value={flatNumber}
              onChangeText={setFlatNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Address *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Enter full street address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Local Government *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Ikeja, Surulere"
              placeholderTextColor="#999"
              value={localGovernment}
              onChangeText={setLocalGovernment}
            />
          </View>

          {/* Hospital Information (optional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hospital Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. St. Mary's Hospital"
              placeholderTextColor="#999"
              value={hospitalName}
              onChangeText={setHospitalName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hospital Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 123 Main St, Lagos"
              placeholderTextColor="#999"
              value={hospitalAddress}
              onChangeText={setHospitalAddress}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Patient ID</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 123456"
              placeholderTextColor="#999"
              value={patientId}
              onChangeText={setPatientId}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>State</Text>
            <View style={styles.stateContainer}>
              <TouchableOpacity style={styles.stateOption} disabled>
                <Ionicons
                  name="location"
                  size={18}
                  color="forestgreen"
                  style={styles.stateIcon}
                />
                <Text style={styles.stateText}>Lagos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Save Location</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  helpButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  formSection: {
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  titleOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  titleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: 'forestgreen',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  selectedTitleOption: {
    backgroundColor: 'forestgreen',
    borderColor: 'forestgreen',
  },
  titleIcon: {
    marginRight: 6,
  },
  titleOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  selectedTitleOptionText: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  multilineInput: {
    borderRadius: 15,
    textAlignVertical: 'top',
  },
  stateContainer: {
    flexDirection: 'row',
  },
  stateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: 'forestgreen',
    backgroundColor: '#fff',
  },
  stateIcon: {
    marginRight: 8,
  },
  stateText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'forestgreen',
  },
  submitButton: {
    backgroundColor: 'forestgreen',
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: 'forestgreen',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 40,
  },
});

LocationFormScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
};

export default LocationFormScreen;
