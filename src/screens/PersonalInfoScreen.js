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
import axios from 'axios';
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
  const fromOnboarding = route.params?.fromOnboarding ?? false;

  const [username, setUsername] = useState('');
  const [userEmail, setEmail] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [relation, setRelation] = useState(route.params?.relation || '');
  const [profileImage, setProfileImage] = useState(null);

  // Additional form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medication, setMedication] = useState('');
  const [HMO, setHMO] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
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
      let userId = null;
      let user = null;

      if (route.params?.fromOnboarding) {
        // Onboarding flow: get userId from AsyncStorage
        userId = await AsyncStorage.getItem('userId');
        const userEmail = await AsyncStorage.getItem('userEmail');
        setUserId(userId);
        setEmail(userEmail || '');
      } else {
        // Returning user: get user object from AsyncStorage
        const userDataString = await AsyncStorage.getItem('user');
        console.log('Fetched userDataString:', userDataString);
        if (userDataString) {
          const user = JSON.parse(userDataString);
          console.log('Parsed user:', user);
          userId = user._id;
          setUserId(userId);
          console.log('userId after parsing:', userId);

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
          setEmergencyContactName(user.emergencyContactName || '');
          setAllergyType(user.allergyType || '');
          setEmergencyContactRelation(user.emergencyContactRelation || '');
        }
      }

      if (!userId) {
        Alert.alert('Error', 'User ID not found. Please log in again.');
      }
    };

    fetchUserData();
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
      setPhoneNumberError('Please enter a valid phone number.');
    }
  };

  const handleEmergencyContactChange = (text) => {
    setEmergencyContact(text);
    try {
      phoneNumberSchema.parse(text);
      setEmergencyContactError(''); // Clear error if valid
    } catch {
      setEmergencyContactError('Please enter a valid phone number.');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      const userData = JSON.parse(userDataString);
      let userIdToUse = userId; // userId from state
      if (!userIdToUse) {
        const userDataString = await AsyncStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        userIdToUse = userData?.profile?._id;
      }
      console.log('userId:', userIdToUse);

      const idToUse = userIdToUse;
      if (!idToUse) {
        Alert.alert('Error', 'User ID not found. Please log in again.');
        return;
      }

      // Validate phone number and emergency contact
      phoneNumberSchema.parse(phoneNumber);
      phoneNumberSchema.parse(emergencyContact);

      if (!bloodGroup) {
        Alert.alert('Error', 'Please select your blood group.');
        return;
      }

      if (!username || !dateOfBirth) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      const data = {
        userId: idToUse,
        email: userEmail,
        username,
        gender: selectedValue,
        phoneNumber,
        dateOfBirth,
        bloodGroup,
        allergies: allergies || '',
        allergyType: allergyType || '',
        medication: medication || '',
        HMO: HMO || '',
        memberID: memberID || '',
        emergencyContact,
        emergencyContactName: emergencyContactName || '',
        emergencyContactRelation: emergencyContactRelation || '',
        relation: relation || '',
      };

      // Only add profileImage if it is a non-empty string
      if (
        profileImage &&
        typeof profileImage === 'string' &&
        profileImage.trim() !== ''
      ) {
        data.profileImage = profileImage;
      }

      console.log(
        'Updating profile at:',
        `${API_URL}/users/${idToUse}/profile`
      );
      console.log('Payload:', data);

      setLoading(true);
      const response = await axios.put(
        `${API_URL}/users/${idToUse}/profile`,
        data
      );

      console.log('Response:', response);
      // Assume backend returns updated user object as response.data.user
      const updatedUser = response.data.user || response.data;
      const updatedUsername = updatedUser.username;

      // Update username state and save to AsyncStorage
      setUsername(updatedUsername);
      await AsyncStorage.setItem('username', updatedUsername);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      setEditable(false);
      Alert.alert('Profile Updated', response.data.message);
      // Navigate to LocationFormScreen for primary location
      navigation.navigate('LocationForm', { locationType: 'primary' });
    } catch (error) {
      if (error.response) {
        console.log('Backend error:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error setting up request:', error.message);
      }
      console.log('Error config:', error.config);
      Alert.alert(
        'Error',
        error.response.data.message ||
          JSON.stringify(error.response.data) ||
          'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  console.log('PersonalInfoScreen params:', route.params);
  console.log('userId:', userId);

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Floating Edit Button */}

      <ScrollView contentContainerStyle={styles.container}>
        {!editable && !fromOnboarding && (
          <TouchableOpacity
            style={styles.editModeButton}
            onPress={() => setEditable(true)}
            activeOpacity={0.8}
          >
            <Feather name="edit-2" size={20} color="#fff" />
          </TouchableOpacity>
        )}
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
          <TouchableOpacity
            style={styles.profileImageEditButton}
            onPress={pickImage}
          >
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
            editable={editable}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            value={userEmail}
            editable={false}
            selectTextOnFocus={false}
            placeholder="Email"
          />
          <View style={styles.gender}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              enabled={editable}
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
            editable={editable}
          />
          {phoneNumberError ? (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          ) : null}

          <View>
            <TouchableOpacity
              style={styles.input}
              onPress={() => editable && setOpen(true)}
              disabled={!editable}
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
              enabled={editable}
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
              selectedValue={allergyType}
              onValueChange={(itemValue) => setAllergyType(itemValue)}
              enabled={editable}
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
            editable={editable}
          />
          <TextInput
            style={styles.input}
            placeholder="Medication"
            value={medication}
            onChangeText={setMedication}
            editable={editable}
          />
          <View style={styles.gender}>
            <Picker
              selectedValue={HMO}
              onValueChange={(itemValue) => setHMO(itemValue)}
              enabled={editable}
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
            editable={editable}
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Emergency Contact"
            value={emergencyContactName}
            onChangeText={setEmergencyContactName}
            editable={editable}
          />
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact Phone Number"
            value={emergencyContact}
            onChangeText={handleEmergencyContactChange}
            editable={editable}
            keyboardType="phone-pad"
          />
          {emergencyContactError ? (
            <Text style={styles.errorText}>{emergencyContactError}</Text>
          ) : null}
          <View style={styles.gender}>
            <Picker
              selectedValue={emergencyContactRelation}
              onValueChange={setEmergencyContactRelation}
              enabled={editable}
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

        {/* Submit Button */}
        {editable && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleProfileUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </TouchableOpacity>
        )}
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
  profileImageEditButton: {
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
  editModeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'forestgreen',
    borderRadius: 24,
    padding: 10,
    elevation: 4,
    zIndex: 10,
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
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '500',
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
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0B9444',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default PersonalInfoScreen;
