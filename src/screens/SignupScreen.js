// /* eslint-disable no-undef */
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather'; // Make sure to install this package

// const SignUpScreen = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Create Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity
//           onPress={() => setShowPassword(!showPassword)}
//           style={styles.eyeIcon}
//         >
//           <Icon
//             name={showPassword ? 'eye' : 'eye-off'}
//             size={24}
//             color="gray"
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry={!showConfirmPassword}
//         />
//         <TouchableOpacity
//           onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//           style={styles.eyeIcon}
//         >
//           <Icon
//             name={showConfirmPassword ? 'eye' : 'eye-off'}
//             size={24}
//             color="gray"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.signUpButton}
//         onPress={() => navigation.navigate('SignInOptions')}
//       >
//         <Text style={styles.signUpButtonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <View style={styles.signInContainer}>
//         <Text style={styles.signInText}>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//           <Text style={styles.signInLink}>Sign in</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.orContainer}>
//         <View style={styles.orLine} />
//         <Text style={styles.orText}>or</Text>
//         <View style={styles.orLine} />
//       </View>

//       <TouchableOpacity style={styles.googleButton}>
//         <Image source={require('../../assets/Googlelogo.png')} />
//         <Text style={styles.googleButtonText}>Continue With Google</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather' 
import axios from 'axios'
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native'



import API_URL from '../config/api'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

const SignUpScreen = () => {

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

/*    useEffect(() => {
    GoogleSignin.configure({
      webClientId: '817053433167-vnk3fq2o6v0kn50uh6g63u2mg5ohmftl.apps.googleusercontent.com', 
      offlineAccess: false,  
    });
  }, []); */


/*   const handleGoogleSignIn = async () => {

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
      console.log(response)
  
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
 */

  
  

const handleSignUp = async () => {
  if (!email || !password || !confirmPassword) {
    Toast.error('Error')
    return;
  }

  if (password !== confirmPassword) {
    Toast.warn('Passwords must match');
    return;
  }

  try {
    setLoading(true)

    const data = {
      email,
      password,
      confirmPassword
    };

    const response = await axios.post(`${API_URL}/signup`, data);
    await AsyncStorage.setItem('userEmail', email);
    Alert.alert('Success', response.data.message);
    navigation.navigate('SignInOptions', { email });
  } catch (error) {
    // Check for validation errors
    const validationErrors = error.response?.data?.errors;
    
    if (validationErrors && validationErrors.length > 0) {
      // Display all validation error messages
      const errorMessage = validationErrors.map(err => err.msg).join('\n');
      Alert.alert('Validation Error', errorMessage);
    } else {
      const message = error.response?.data?.message || 'An error occurred';
    
      if (message === "This email is already registered") {
        Alert.alert(
          'The email address is already registered. Please Sign In.'
        );
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
      )}      </View>

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

      <TouchableOpacity /*onPress={handleGoogleSignIn} */ disabled={loading} style={styles.googleButton}>
      <Image
          // eslint-disable-next-line no-undef
          source={require('../../assets/Googlelogo.png')}
          style={styles.googleLogo}
        />
        <Text>Sign up with Google</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </TouchableOpacity>
    </SafeAreaView>
  )
}

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
    marginBottom: 67.2,
    textAlign: 'center'
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
  signUpButton: {
    backgroundColor: 'forestgreen',
    padding: 15,
    borderRadius: 71,
    alignItems: 'center',
    marginTop: 40
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  signInText: {
    color: 'black'
  },
  signInLink: {
    color: 'black',
    fontWeight: 'bold'
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black'
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16
  }
})

export default SignUpScreen
