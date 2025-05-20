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
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Assuming axios is being used for API requests
import API_URL from '../config/api';
import { z } from 'zod';
import { SafeAreaView } from 'react-native-safe-area-context';

// Set a custom error map to avoid localization issues
z.setErrorMap((issue, ctx) => {
  return { message: ctx.defaultError };
});

const PersonalInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [editable, setEditable] = useState(route.params?.editable ?? false);

  const [username, setUsername] = useState('');
  const [userEmail, setEmail] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [relation, setRelation] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Additional form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medication, setMedication] = useState('');
  const [HMO, setHMO] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [allergyType, setAllergyType] = useState('');
  const [memberID, setMemberID] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emergencyContactError, setEmergencyContactError] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('');

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false); // Add state for open

  // zod schema
  const phoneNumberSchema = z.string().regex(/^\d{7,15}$/, {
    message:
      'Phone number must contain only digits and be between 7 and 15 characters long.',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataString = await AsyncStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const user = userData.user;
        setUsername(user.username || '');
        setEmail(user.email || '');
        setSelectedValue(user.gender || '');
        setRelation(user.relation || '');
        setProfileImage(user.profileImage || null);
        setPhoneNumber(user.phoneNumber || '');
        setDateOfBirth(user.dateOfBirth || '');
        setBloodGroup(user.bloodGroup || '');
        setAllergies(user.allergies || '');
        setMedication(user.medication || '');
        setHMO(user.HMO || '');
        setMemberID(user.memberID || '');
        setEmergencyContact(user.emergencyContact || '');
        setAllergyType(user.allergyType || '');
        setEmergencyContactRelation(user.emergencyContactRelation || '');
        setUserId(user._id || '');
      }
    };

    // Only prefill if not coming from onboarding (e.g., check a param)
    if (!route.params?.fromOnboarding) {
      fetchUserData();
    }
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
      mediaTypes: ImagePicker.MediaType.IMAGE,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    try {
      phoneNumberSchema.parse(text);
      setPhoneNumberError(''); // Clear error if valid
    } catch {
      setPhoneNumberError(
        'Phone number must contain only digits and be between 7 and 15 characters long.'
      );
    }
  };

  const handleEmergencyContactChange = (text) => {
    setEmergencyContact(text);
    try {
      phoneNumberSchema.parse(text);
      setEmergencyContactError(''); // Clear error if valid
    } catch {
      setEmergencyContactError(
        'Emergency contact must contain only digits and be between 7 and 15 characters long.'
      );
    }
  };

  const handleProfileUpdate = async () => {
    try {
      // Validate phone number and emergency contact
      phoneNumberSchema.parse(phoneNumber);
      phoneNumberSchema.parse(emergencyContact);

      if (!bloodGroup) {
        Alert.alert('Error', 'Please select your blood group.');
        return;
      }

      if (!username || !dateOfBirth || !allergies || !medication || !HMO) {
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
        allergyType,
        medication,
        HMO,
        memberID,
        emergencyContact,
        emergencyContactRelation,
        relation: relation || '',
      };

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
      if (error instanceof z.ZodError) {
        // Handle validation errors
        Alert.alert('Validation Error', error.errors[0].message);
      } else {
        console.error('Unexpected error:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
            editable={editable} // Incorporate the suggested code change
            onChangeText={setUsername}
          />
          <View style={styles.input}>
            <Text style={{ color: 'grey' }}>
              {userEmail || 'No email available'}
            </Text>
          </View>
          <View style={styles.gender}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={{ color: 'grey' }}
            >
              <Picker.Item
                label="Select your gender"
                value=""
                enabled={false}
              />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          {phoneNumberError ? (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          ) : null}

          <View>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpen(true)}
            >
              <Text style={{ color: 'grey' }}>
                {dateOfBirth || 'Select Date of Birth'}
              </Text>
            </TouchableOpacity>
            {open && (
              <DateTimePicker
                value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setOpen(false);
                  if (selectedDate) {
                    setDateOfBirth(selectedDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
                  }
                }}
              />
            )}
          </View>
          <View style={styles.gender}>
            <Picker
              selectedValue={bloodGroup}
              onValueChange={(itemValue) => setBloodGroup(itemValue)}
              style={{ color: 'grey' }}
            >
              <Picker.Item
                label="Select your blood group"
                value=""
                enabled={false}
              />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
          <View style={styles.gender}>
            <Picker
              selectedValue={allergyType} // Use allergyType for the dropdown
              onValueChange={(itemValue) => setAllergyType(itemValue)}
              style={{ color: 'grey' }}
            >
              <Picker.Item
                label="Select allergy type"
                value=""
                enabled={false}
              />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Drugs" value="drugs" />
              <Picker.Item label="Environmental" value="environmental" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Specify allergen (e.g., Peanuts, Penicillin)"
            value={allergies}
            onChangeText={setAllergies}
          />
          <TextInput
            style={styles.input}
            placeholder="Medication"
            value={medication}
            onChangeText={setMedication}
          />
          <View style={styles.gender}>
            <Picker
              selectedValue={HMO} // Use the existing HMO state
              onValueChange={(itemValue) => setHMO(itemValue)}
              style={{ color: 'grey' }}
            >
              <Picker.Item label="Select your HMO" value="" enabled={false} />
              <Picker.Item label="Reliance" value="reliance" />
              <Picker.Item label="Axa Mansard" value="axa_mansard" />
              <Picker.Item label="Bastion" value="bastion" />
              <Picker.Item label="Avon" value="avon" />
              <Picker.Item label="Bupa MSO" value="bupa_mso" />
              <Picker.Item label="Oriental" value="oriental" />
              <Picker.Item label="Hygeia" value="hygeia" />
              <Picker.Item label="Liberty Blue" value="libertyblue" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your HMO Member ID"
            value={memberID}
            onChangeText={setMemberID}
          />
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact"
            value={emergencyContact}
            onChangeText={handleEmergencyContactChange}
          />
          {emergencyContactError ? (
            <Text style={styles.errorText}>{emergencyContactError}</Text>
          ) : null}
          <View style={styles.gender}>
            <Picker
              selectedValue={emergencyContactRelation}
              onValueChange={setEmergencyContactRelation}
              style={{ color: 'grey' }}
            >
              <Picker.Item
                label="Relation to Emergency Contact"
                value=""
                enabled={false}
              />
              <Picker.Item label="Father" value="father" />
              <Picker.Item label="Mother" value="mother" />
              <Picker.Item label="Sibling" value="sibling" />
              <Picker.Item label="Spouse" value="spouse" />
              <Picker.Item label="Friend" value="friend" />
              <Picker.Item label="Guardian" value="guardian" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        {/* Edit Button - Shown only when not editable */}
        {!editable && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditable(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  editButtonText: {
    color: 'white',
    fontSize: 16,
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
    color: 'grey',
  },
  gender: {
    textColor: 'grey',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40, // Add height to match TextInput
    justifyContent: 'center', // Center the text inside the dropdown
    marginVertical: 5,
    color: 'grey',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 5,
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
