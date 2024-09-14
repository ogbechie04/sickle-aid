import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PersonalInfoScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Text onPress={() => navigation.navigate('SignInOptions')}>←</Text>
      </TouchableOpacity>

      {/* Profile Image */}
      <Image
        source={{ url: 'https://your-profile-image-url' }}
        style={styles.profileImage}
      />

      {/* Personal Info Title */}
      <Text style={styles.title}>Personal Information</Text>
      <Text style={styles.subtitle}>Account type - PSC</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Gender" />
        <TextInput style={styles.input} placeholder="Phone number" />
        <TextInput style={styles.input} placeholder="Date of birth" />
        <TextInput style={styles.input} placeholder="Blood Group" />
        <TextInput style={styles.input} placeholder="Allergies" />
        <TextInput style={styles.input} placeholder="Medication" />
        <TextInput style={styles.input} placeholder="HMO" />
        <TextInput style={styles.input} placeholder="Emergency Contact" />
      </View>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 50,
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
  editButton: {
    alignSelf: 'center',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  editText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});

export default PersonalInfoScreen;
