/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import API_URL from '../config/api'



const SignInScreen = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '817053433167-vnk3fq2o6v0kn50uh6g63u2mg5ohmftl.apps.googleusercontent.com', 
      offlineAccess: false,  
    });
  }, []);

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const[loading, setLoading] = useState(false);



  const handleGoogleSignIn = async () => {

    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();  
      const userInfo = await GoogleSignin.signIn();  
  
 
      await AsyncStorage.setItem('userEmail', userInfo.user.email);
      
      console.log('Google Sign-In Success:', userInfo);
      setLoading(false);
  
      const response = await axios.post(`${API_URL}/signin/google`, {
        email: userInfo.user.email,
        name: userInfo.user.name, 
        
      });
  
      if (response.status === 200) {
        
        alert('Successfully signed in');
        
       
        await AsyncStorage.setItem('userToken', response.data.token);  
        
        // Navigate to MainApp
        navigation.navigate('MainApp', { email: userInfo.user.email });
      } else {
        Alert.alert('Error', response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Error', 'User cancelled the sign-in process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Error', 'Sign-in is in progress');
      } else {
        console.error('Google Sign-In Error:', error);
        Alert.alert('Error', error.message || 'An error occurred. Please try again later.');
      }
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
  
    try {
      setLoading(true);
  
      //console.log('Request:', {
        //url: `${API_URL}/signin`,
        //payload: { email, password },
      //});
  
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password,
      });
  
      // Log full response
      console.log('Response:', response);
  
      const result = response.data;
      setLoading(false);
  
      if (response.status === 200) {
        await AsyncStorage.setItem('userEmail', email);
        alert('Successfully signed in', response.data.message)
        navigation.navigate('MainApp', { email }) 
      } else {
        Alert.alert('Error', result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
  
      console.error('Login Error:', {
        message: error.message,
        response: error.response?.data,
      });
  
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred. Please try again later.'
      );
    }
  };
  


  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Kindly enter your details to access your account
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity onPress={handleGoogleSignIn} disabled={loading} style={styles.googleButton}>
      <Image
          // eslint-disable-next-line no-undef
          source={require('../../assets/Googlelogo.png')}
          style={styles.googleLogo}
        />
        <Text>Sign in with Google</Text>
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
    marginTop: 40.58
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 47.2
  },
  subtitle: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8
  },
  input: {
    flex: 1,
    padding: 10
  },
  eyeIcon: {
    padding: 10
  },
  signInButton: {
    backgroundColor: 'forestgreen',
    padding: 15,
    borderRadius: 71,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: 20
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black'
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'black'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 15,
    borderRadius: 5
  },
  googleButtonText: {
    color: 'black',
    marginLeft: 10
  }
})

export default SignInScreen
