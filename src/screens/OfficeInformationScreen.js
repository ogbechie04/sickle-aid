/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const OfficeInformation = ({ navigation }) => {
  const hospitalData = {
    name: 'St. Nicholas Hospital',
    address: '57 Campbell Street, Lagos Island, Lagos State.',
    patientId: 'SN777-345-54',
    hospitalNumber: '02012718690',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hospital Information</Text>
        </View>

        {/* Hospital Details */}
        <View style={styles.contentContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hospital Name</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.value}>{hospitalData.name}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hospital Address</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.value}>{hospitalData.address}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Patient ID</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.value}>{hospitalData.patientId}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hospital Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.value}>{hospitalData.hospitalNumber}</Text>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.locationSection}>
            <View style={styles.locationHeader}>
              <Ionicons name="location-outline" size={24} color="black" />
              <Text style={styles.locationTitle}>Live location of PSC</Text>
            </View>
            <Image
              source={{ uri: 'https://your-map-image-url.com' }}
              style={styles.mapImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="call-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#3C2A21',
  },
  contentContainer: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  locationSection: {
    marginTop: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#3C2A21',
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    padding: 8,
  },
});

export default OfficeInformation;
