//TO-DO: reload api-url to reflect removed date validation
//add a date picker library
//test extensively

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Assuming axios is being used for API requests
import API_URL from '../config/api';

const PersonalInfoScreen = () => {
  const [username, setUsername] = useState('');
  const [userEmail, setEmail] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [relation, setRelation] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSKAYL6jLWu96azBLYuApNGc4mLX_oqgjJAg&s'
  );

  // Additional form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medication, setMedication] = useState('');
  const [HMO, setHMO] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedRelation = await AsyncStorage.getItem('selectedRelation');
        const storedId = await AsyncStorage.getItem('userId');

        if (storedEmail) setEmail(storedEmail);
        if (storedRelation) setRelation(storedRelation);
        if (storedId) setUserId(storedId);

        console.log('Data retrieved:', {
          storedEmail,
          storedRelation,
          storedId,
        });
      } catch (error) {
        console.error('Error retrieving stored data:', error);
      }
    };

    fetchStoredData();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access camera roll is required!'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleProfileUpdate = async () => {
    if (
      !username ||
      !phoneNumber ||
      !dateOfBirth ||
      !bloodGroup ||
      !allergies ||
      !medication ||
      !HMO ||
      !emergencyContact
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const data = {
      userId,
      username,
      profileImage,
      gender: selectedValue,
      phoneNumber,
      dateOfBirth,
      bloodGroup,
      allergies,
      medication,
      HMO,
      emergencyContact,
      relation: relation || '',
    };

    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/users/${userId}/profile`,
        data
      );
      const updatedUsername = response.data.profile.username;

      // Update username state and save to AsyncStorage
      setUsername(updatedUsername);
      await AsyncStorage.setItem('username', updatedUsername);

      Alert.alert('Profile Updated', response.data.message);
      navigation.navigate('MainApp');
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        const errorMessage =
          errors && Array.isArray(errors)
            ? errors.map((err) => err.msg).join('\n')
            : error.response.data.message || 'Failed to update profile';

        Alert.alert('Error', errorMessage);
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
        Alert.alert('Error', 'No response from server');
      } else {
        console.error('Unexpected error:', error.message);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Profile Image with Edit Button */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Personal Info Title */}
      <Text style={styles.title}>Personal Information</Text>
      <Text style={styles.subtitle}>{relation}</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} disabled={true} value={userEmail} />

        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select your gender" value="" enabled={false} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <TextInput
          style={styles.input}
          placeholder="Blood Group"
          value={bloodGroup}
          onChangeText={setBloodGroup}
        />
        <TextInput
          style={styles.input}
          placeholder="Allergies"
          value={allergies}
          onChangeText={setAllergies}
        />
        <TextInput
          style={styles.input}
          placeholder="Medication"
          value={medication}
          onChangeText={setMedication}
        />
        <TextInput
          style={styles.input}
          placeholder="HMO"
          value={HMO}
          onChangeText={setHMO}
        />
        <TextInput
          style={styles.input}
          placeholder="Emergency Contact"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleProfileUpdate}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loading spinner
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 50,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: '#0B9444',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default PersonalInfoScreen;
