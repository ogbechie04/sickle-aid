import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import API_URL from '../config/api';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const UpdatePassword = ({ route }) => {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  const email = route.params?.email;

  const handleProceed = async () => {
    if (newPassword !== confirmPassword) {
      showAlert('Error', 'Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      showAlert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/update-password`,
        { email, newPassword },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        showAlert('Success', 'Password updated successfully.');
        navigation.navigate('SignIn');
      } else {
        showAlert(
          'Error',
          data?.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      console.error(error);
      showAlert('Error', 'Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (setter) => () => setter((prev) => !prev);
  const showAlert = (title, message) => Alert.alert(title, message);
  const handlePasswordFocus = () => setIsPasswordInputFocused(true);
  const handlePasswordBlur = () => setIsPasswordInputFocused(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>
        Create a new password for{' '}
        <Text style={{ fontWeight: 'bold' }}>{email}</Text>
      </Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility(setShowNewPassword)}
          style={styles.eyeIcon}
        >
          <Feather
            name={showNewPassword ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility(setShowConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Feather
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {isPasswordInputFocused && (
        <PasswordStrengthMeter password={newPassword} />
      )}

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handleProceed}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.proceedButtonText}>Proceed</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 40.58,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 21,
  },
  subtitle: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  proceedButton: {
    backgroundColor: 'forestgreen',
    padding: 15,
    borderRadius: 71,
    alignItems: 'center',
    marginTop: 30,
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdatePassword;
