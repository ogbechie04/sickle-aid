import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import axios from 'axios';
import API_URL from '../../config/api';

function SosScreen(props) {
  const { navigation } = props;
  const [savedLocations, setSavedLocations] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch saved locations on component mount and when screen comes into focus
  useEffect(() => {
    fetchSavedLocations();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchSavedLocations();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchSavedLocations = async () => {
    try {
      // Try to fetch from backend first
      const userDataString = await AsyncStorage.getItem('user');
      const user = userDataString ? JSON.parse(userDataString) : {};
      console.log('SosScreen - Raw user data:', user);

      let userId = null;

      // Try to get userId from different possible structures
      if (user._id) {
        userId = user._id;
        console.log('SosScreen - User ID from user._id:', userId);
      } else if (user.profile && user.profile._id) {
        userId = user.profile._id;
        console.log('SosScreen - User ID from user.profile._id:', userId);
      } else if (user.userId) {
        userId = user.userId;
        console.log('SosScreen - User ID from user.userId:', userId);
      }

      // Fallback to userId from AsyncStorage if user object doesn't have _id
      if (!userId) {
        const userIdFromStorage = await AsyncStorage.getItem('userId');
        if (userIdFromStorage) {
          userId = userIdFromStorage;
          console.log('SosScreen - User ID from userId storage:', userId);
        }
      }

      console.log('SosScreen - Final User ID:', userId);

      if (userId) {
        const token = await AsyncStorage.getItem('token');
        console.log('SosScreen - Token exists:', !!token);

        const response = await axios.get(
          `${API_URL}/get-hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('SosScreen - API Response:', response.data);

        if (response.data.message === 'Hospital locations fetched successfully') {
          const hospitalDataArray = response.data.data;
          console.log('SosScreen - Hospital data array:', hospitalDataArray);
          console.log('SosScreen - Number of hospital records:', hospitalDataArray.length);

          if (hospitalDataArray && hospitalDataArray.length > 0) {
            // Collect all locations from ALL hospital records
            const allLocations = [];
            hospitalDataArray.forEach((hospitalInfo, index) => {
              console.log(`SosScreen - Hospital ${index + 1} ID:`, hospitalInfo._id);
              console.log(`SosScreen - Hospital ${index + 1} locations:`, hospitalInfo.locations);
              console.log(`SosScreen - Hospital ${index + 1} location count:`, hospitalInfo.locations ? hospitalInfo.locations.length : 0);

              if (hospitalInfo.locations && hospitalInfo.locations.length > 0) {
                // Add each location with its hospital record info
                hospitalInfo.locations.forEach((location, locIndex) => {
                  console.log(`SosScreen - Adding location ${locIndex + 1} from hospital ${index + 1}:`, location);
                  allLocations.push({
                    ...location,
                    hospitalRecordId: hospitalInfo._id, // Keep track of which record it came from
                  });
                });
              } else {
                console.log(`SosScreen - Hospital ${index + 1} has no locations`);
              }
            });

            console.log('SosScreen - Total collected locations:', allLocations.length);
            console.log('SosScreen - All collected locations:', allLocations);

            // Store the aggregated locations in AsyncStorage for easy access
            const aggregatedHospitalInfo = {
              _id: hospitalDataArray[0]._id, // Use first record as primary
              userId: hospitalDataArray[0].userId,
              locations: allLocations,
              createdAt: hospitalDataArray[0].createdAt,
              updatedAt: hospitalDataArray[hospitalDataArray.length - 1].updatedAt, // Use latest update time
            };

            await AsyncStorage.setItem('hospitalInfo', JSON.stringify(aggregatedHospitalInfo));
            console.log('SosScreen - Stored aggregated hospitalInfo:', aggregatedHospitalInfo);
            console.log('SosScreen - Setting savedLocations to:', allLocations);
            setSavedLocations(allLocations);
            return;
          } else {
            console.log('SosScreen - No hospital records found in array');
          }
        } else {
          console.log('SosScreen - API response message not successful:', response.data.message);
        }
      }

      // Fallback to AsyncStorage
      const hospitalInfoString = await AsyncStorage.getItem('hospitalInfo');
      console.log('SosScreen - Fallback hospitalInfoString:', hospitalInfoString);

      if (hospitalInfoString) {
        const hospitalInfo = JSON.parse(hospitalInfoString);
        console.log('SosScreen - Parsed hospitalInfo:', hospitalInfo);
        console.log('SosScreen - Locations from hospitalInfo:', hospitalInfo.locations);
        setSavedLocations(hospitalInfo.locations || []);
      } else {
        console.log('SosScreen - No hospitalInfo found in AsyncStorage');
        setSavedLocations([]);
      }
    } catch (error) {
      console.error('SosScreen - Error fetching saved locations:', error);

      // Fallback to AsyncStorage on error
      try {
        const hospitalInfoString = await AsyncStorage.getItem('hospitalInfo');
        if (hospitalInfoString) {
          const hospitalInfo = JSON.parse(hospitalInfoString);
          setSavedLocations(hospitalInfo.locations || []);
        } else {
          setSavedLocations([]);
        }
      } catch (fallbackError) {
        console.error('SosScreen - Fallback error:', fallbackError);
        setSavedLocations([]);
      }
    }
  };

  const handleAddLocation = () => {
    navigation.navigate('LocationForm', {
      locationType: 'tertiary',
      isEditing: false
    });
  };

  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setEditModalVisible(true);
  };

  const handleDeleteLocation = (location) => {
    Alert.alert(
      'Delete Location',
      `Are you sure you want to delete "${location.customName || location.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteLocation(location)
        }
      ]
    );
  };

  const deleteLocation = async (locationToDelete) => {
    try {
      const hospitalInfoString = await AsyncStorage.getItem('hospitalInfo');
      if (hospitalInfoString) {
        const hospitalInfo = JSON.parse(hospitalInfoString);
        const updatedLocations = hospitalInfo.locations.filter(
          location => location._id !== locationToDelete._id
        );

        const updatedHospitalInfo = {
          ...hospitalInfo,
          locations: updatedLocations
        };

        await AsyncStorage.setItem('hospitalInfo', JSON.stringify(updatedHospitalInfo));
        setSavedLocations(updatedLocations);

        Alert.alert('Success', 'Location deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
      Alert.alert('Error', 'Failed to delete location. Please try again.');
    }
  };

  const handleEditConfirm = () => {
    setEditModalVisible(false);
    if (selectedLocation) {
      navigation.navigate('LocationForm', {
        locationType: 'custom',
        isEditing: true,
        locationToEdit: selectedLocation
      });
    }
  };

  const getLocationIcon = (title) => {
    switch (title) {
      case 'home': return 'home-outline';
      case 'office': return 'briefcase-outline';
      case 'hospital': return 'medical-outline';
      case 'clinic': return 'medical-outline';
      case 'pharmacy': return 'medical-outline';
      case 'school': return 'school-outline';
      case 'university': return 'school-outline';
      case 'airport': return 'airplane-outline';
      case 'bus_station': return 'bus-outline';
      case 'train_station': return 'train-outline';
      case 'police_station': return 'shield-outline';
      case 'fire_station': return 'flame-outline';
      case 'park': return 'leaf-outline';
      case 'gym': return 'fitness-outline';
      case 'mall': return 'bag-outline';
      case 'restaurant': return 'restaurant-outline';
      case 'library': return 'library-outline';
      default: return 'location-outline';
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#332E0E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Manage Locations</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Add Location Button */}
        <TouchableOpacity
          style={[
            styles.addButton,
            savedLocations.length >= 3 && styles.addButtonDisabled
          ]}
          onPress={handleAddLocation}
          disabled={savedLocations.length >= 3}
        >
          <Ionicons
            name="add-circle"
            size={24}
            color={savedLocations.length >= 3 ? "#ccc" : "#fff"}
          />
          <Text style={[
            styles.addButtonText,
            savedLocations.length >= 3 && styles.addButtonTextDisabled
          ]}>
            {savedLocations.length >= 3
              ? 'Location Limit Reached'
              : 'Add New Location'
            }
          </Text>
        </TouchableOpacity>

        {/* Locations List */}
        <View style={styles.locationsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Locations</Text>
            <Text style={styles.locationCount}>
              {savedLocations.length}/3 Locations
            </Text>
          </View>
          {savedLocations.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="location-outline" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>No locations saved yet</Text>
              <Text style={styles.emptyStateSubtext}>Add your first location to get started</Text>
            </View>
          ) : (
            savedLocations.map((location, index) => (
              <View key={location._id || index} style={styles.locationCard}>
                <View style={styles.locationInfo}>
                  <View style={styles.locationIcon}>
                    <Ionicons
                      name={getLocationIcon(location.title)}
                      size={20}
                      color="forestgreen"
                    />
                  </View>
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationTitle}>
                      {location.customName || location.title}
                    </Text>
                    <Text style={styles.locationAddress}>({location.flatNumber}), {location.address}, {location.landmark}, {location.localGovernment}</Text>
                    <Text style={styles.locationLandmark}>{location.state}</Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditLocation(location)}
                  >
                    <Ionicons name="create-outline" size={16} color="forestgreen" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteLocation(location)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Edit Confirmation Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Location</Text>
            <Text style={styles.modalText}>
              You're about to edit "{selectedLocation?.customName || selectedLocation?.title}".
              This will open the location form with pre-filled information.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleEditConfirm}
              >
                <Text style={styles.modalConfirmText}>Edit Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#332E0E',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'forestgreen',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#e0e0e0',
    opacity: 0.7,
  },
  addButtonTextDisabled: {
    color: '#ccc',
  },
  locationsContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#332E0E',
  },
  locationCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'forestgreen',
  },
  locationInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationDetails: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#332E0E',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  locationLandmark: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 20,
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#332E0E',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'forestgreen',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

SosScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SosScreen;
