import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleProceed = () => {
    // Implement password recovery logic
    navigation.navigate('PasswordReset');
    console.log('Proceed with password recovery for:', email);
  };

  return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.subtitle}>
        Enter your email address to recover your password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    marginBottom: 20.45
  },
  subtitle: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 50,
  },
  proceedButton: {
    backgroundColor: 'forestgreen',
    padding: 15,
    borderRadius: 71,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PasswordRecoveryScreen;