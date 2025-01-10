// /* eslint-disable no-undef */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native';

import API_URL from '../config/api';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Toast.error('Error');
      return;
    }

    if (password !== confirmPassword) {
      Toast.warn('Passwords must match');
      return;
    }

    try {
      setLoading(true);

      const data = {
        email,
        password,
        confirmPassword,
      };

      const response = await axios.post(`${API_URL}/signup`, data);
      const userId = response.data.userId;
      console.log('User id is ' + userId);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('userEmail', email);
      console.log('signup successful');
      Alert.alert('Success', response.data.message);
      navigation.navigate('SignInOptions');
    } catch (error) {
      // Check for validation errors
      const validationErrors = error.response?.data?.errors;

      if (validationErrors && validationErrors.length > 0) {
        // Display all validation error messages
        const errorMessage = validationErrors.map((err) => err.msg).join('\n');
        Alert.alert('Validation Error', errorMessage);
      } else {
        const message = error.response?.data?.message || 'An error occurred';
        if (message === 'This email is already registered') {
          Alert.alert(
            'The email address is already registered. Please Sign In.'
          );
          console.log(message);
          navigation.navigate('SignIn');
        } else {
          Alert.alert('Sign-Up Failed', message);
        }
      }
      console.error('Error during sign-up:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager
        width={300}
        position="top"
        hasBackdrop={true}
        backdropOpacity={0.5}
        textStyle={styles.googleButtonText}
      />
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create a Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onFocus={() => setIsPasswordInputFocused(true)}
            onBlur={() => setIsPasswordInputFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Icon
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View>
        {isPasswordInputFocused && (
          <PasswordStrengthMeter password={password} />
        )}
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity
        /*onPress={handleGoogleSignIn} */ disabled={loading}
        style={styles.googleButton}
      >
        <Image
          // eslint-disable-next-line no-undef
          source={require('../../assets/Googlelogo.png')}
          style={styles.googleLogo}
        />
        <Text>Sign up with Google</Text>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    marginTop: 40.58,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 67.2,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  signUpButton: {
    backgroundColor: 'forestgreen',
    padding: 15,
    borderRadius: 71,
    alignItems: 'center',
    marginTop: 40,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: 'black',
  },
  signInLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SignUpScreen;
