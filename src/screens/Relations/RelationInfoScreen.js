import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RelationshipDropdown from './RelationshipDropdown';

const RelationProfileScreen = () => {
  const [relationship, setRelationship] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://placeholder.svg?height=80&width=80' }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.accountType}>Account type - Caregiver</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Name" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Username" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Phone number" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Email" />
        </View>

        <RelationshipDropdown onSelect={(value) => setRelationship(value)} />

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Connected patient(s)" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Access level" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Emergency contact" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Notification preferences"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Address" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B6914', // Matching the gold/brown color from your design
    marginBottom: 5,
  },
  accountType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#8B6914',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  editButtonText: {
    color: '#8B6914',
    fontSize: 14,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default RelationProfileScreen;
