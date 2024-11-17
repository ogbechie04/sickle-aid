

const handleGoogleSignIn = async () => {

    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();  // Ensure Google Play services are available
      const userInfo = await GoogleSignin.signIn();  // Sign in using Google
  
      // Store user info in AsyncStorage (email, token, etc.)
      await AsyncStorage.setItem('userEmail', userInfo.user.email);
      
      console.log('Google Sign-In Success:', userInfo);
      setLoading(false);
  
      // Send email to your backend API for processing
      const response = await axios.post(`${API_URL}/signin/google`, {
        email: userInfo.user.email,
        name: userInfo.user.name, // Optional: Send additional info like name
        // Add other info like photo if necessary
      });
  
      if (response.status === 200) {
        // Successfully signed in or registered
        alert('Successfully signed in');
        
        // Store user data or JWT token in AsyncStorage (if provided by your API)
        await AsyncStorage.setItem('userToken', response.data.token);  // Example if you're using JWT tokens
        
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

  export default handleGoogleSignIn;