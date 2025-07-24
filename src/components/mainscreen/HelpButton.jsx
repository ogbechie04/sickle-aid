// import React from 'react';
// import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';
// import helpIcon from '../../../assets/icons/help-icon.png';

// function HelpButton(props) {
//   const { navigation } = props;
//   const { container, helpText } = styles;
//   return (
//     <TouchableOpacity
//       style={container}
//       onPress={() => navigation.navigate('SOS')}
//     >
//       <Image source={helpIcon} />
//       <Text style={helpText}>Tap {'\n'} Help!!</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 84.6272,
//     height: 84.6272,
//     borderWidth: 4.922,
//     borderColor: '#009444',
//     borderRadius: 50,
//   },
//   helpText: {
//     fontFamily: 'Inter',
//     fontSize: 9.844,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#009444',
//   },
// });
// HelpButton.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

// export default HelpButton;

import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Modal,
  View,
  ScrollView,
  Animated,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../../config/api';

function SOSButton({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [savedLocations, setSavedLocations] = useState([]);

  // Fetch locations from backend and AsyncStorage every time the modal is opened
  const fetchLocations = async () => {
    try {
      // Get userId from user object in AsyncStorage
      const userDataString = await AsyncStorage.getItem('user');
      const user = userDataString ? JSON.parse(userDataString) : {};
      console.log('HelpButton - Raw user data:', user);

      let userId = null;

      // Try to get userId from different possible structures
      if (user._id) {
        userId = user._id;
        console.log('HelpButton - User ID from user._id:', userId);
      } else if (user.profile && user.profile._id) {
        userId = user.profile._id;
        console.log('HelpButton - User ID from user.profile._id:', userId);
      } else if (user.userId) {
        userId = user.userId;
        console.log('HelpButton - User ID from user.userId:', userId);
      }

      // Fallback to userId from AsyncStorage if user object doesn't have _id
      if (!userId) {
        const userIdFromStorage = await AsyncStorage.getItem('userId');
        if (userIdFromStorage) {
          userId = userIdFromStorage;
          console.log('HelpButton - User ID from userId storage:', userId);
        }
      }

      console.log('HelpButton - Final User ID:', userId);

      if (userId) {
        const token = await AsyncStorage.getItem('token');
        console.log('HelpButton - Token exists:', !!token);

        const response = await axios.get(
          `${API_URL}/get-hospital/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('HelpButton - API Response:', response.data);

        if (response.data.message === 'Hospital locations fetched successfully') {
          // The backend returns an array of hospital objects, collect all locations
          const hospitalDataArray = response.data.data;
          console.log('HelpButton - Hospital data array:', hospitalDataArray);
          console.log('HelpButton - Number of hospital records:', hospitalDataArray.length);

          if (hospitalDataArray && hospitalDataArray.length > 0) {
            // Collect all locations from ALL hospital records
            const allLocations = [];
            hospitalDataArray.forEach((hospitalInfo, index) => {
              console.log(`HelpButton - Hospital ${index + 1} ID:`, hospitalInfo._id);
              console.log(`HelpButton - Hospital ${index + 1} locations:`, hospitalInfo.locations);
              console.log(`HelpButton - Hospital ${index + 1} location count:`, hospitalInfo.locations ? hospitalInfo.locations.length : 0);

              if (hospitalInfo.locations && hospitalInfo.locations.length > 0) {
                // Add each location with its hospital record info
                hospitalInfo.locations.forEach((location, locIndex) => {
                  console.log(`HelpButton - Adding location ${locIndex + 1} from hospital ${index + 1}:`, location);
                  allLocations.push({
                    ...location,
                    hospitalRecordId: hospitalInfo._id, // Keep track of which record it came from
                  });
                });
              } else {
                console.log(`HelpButton - Hospital ${index + 1} has no locations`);
              }
            });

            console.log('HelpButton - Total collected locations:', allLocations.length);
            console.log('HelpButton - All collected locations:', allLocations);

            // Store the aggregated locations in AsyncStorage for easy access
            const aggregatedHospitalInfo = {
              _id: hospitalDataArray[0]._id, // Use first record as primary
              userId: hospitalDataArray[0].userId,
              locations: allLocations,
              createdAt: hospitalDataArray[0].createdAt,
              updatedAt: hospitalDataArray[hospitalDataArray.length - 1].updatedAt, // Use latest update time
            };

            await AsyncStorage.setItem('hospitalInfo', JSON.stringify(aggregatedHospitalInfo));
            console.log('HelpButton - Stored aggregated hospitalInfo:', aggregatedHospitalInfo);
            console.log('HelpButton - Setting savedLocations to:', allLocations);
            setSavedLocations(allLocations);
            return;
          } else {
            console.log('HelpButton - No hospital records found in array');
          }
        } else {
          console.log('HelpButton - API response message not successful:', response.data.message);
        }
      }

      // Fallback to AsyncStorage
      const hospitalInfoString = await AsyncStorage.getItem('hospitalInfo');
      console.log('HelpButton - Fallback hospitalInfoString:', hospitalInfoString);

      if (hospitalInfoString) {
        const hospitalInfo = JSON.parse(hospitalInfoString);
        console.log('HelpButton - Fallback hospitalInfo:', hospitalInfo);
        console.log('HelpButton - Fallback locations:', hospitalInfo.locations);
        setSavedLocations(hospitalInfo.locations || []);
      } else {
        console.log('HelpButton - No hospitalInfo found in AsyncStorage');
        setSavedLocations([]);
      }
    } catch (error) {
      console.error('HelpButton - Error fetching locations:', error);

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
        console.error('HelpButton - Fallback error:', fallbackError);
        setSavedLocations([]);
      }
    }
  };

  React.useEffect(() => {
    if (modalVisible) {
      fetchLocations();
    }
  }, [modalVisible]);

  // Pulse animation for "Find One Near Me" button
  React.useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    if (modalVisible) {
      pulse();
    }
  }, [modalVisible, pulseAnim]);

  const handleSOSPress = () => {
    setModalVisible(true);
  };

  const handleLocationSelect = (location) => {
    setModalVisible(false);

    // Navigate to ambulance calling page with selected location data
    navigation.navigate('CallAmbulance', {
      selectedLocation: location,
      emergencyType: 'sickle_cell_crisis'
    });
  };

  const handleFindNearMe = () => {
    setModalVisible(false);

    // Navigate to ambulance calling page with current location
    navigation.navigate('CallAmbulance', {
      useCurrentLocation: true,
      emergencyType: 'sickle_cell_crisis'
    });
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => {
        handleSOSPress();
      }}>
        <Ionicons name="medical" size={32} color="#009444" />
        <Text style={styles.helpText}>Tap {'\n'} Help!!</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Emergency Location</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.emergencyNotice}>
              <Ionicons name="warning" size={20} color="#DC2626" />
              <Text style={styles.emergencyNoticeText}>
                Emergency services will be called to your selected location
              </Text>
            </View>

            <ScrollView style={styles.locationsList} showsVerticalScrollIndicator={false}>
              {savedLocations.map((location, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.locationItem}
                  onPress={() => handleLocationSelect(location)}
                >
                  <View style={styles.locationIcon}>
                    <Ionicons
                      name={
                        location.title === 'home'
                          ? 'home-outline'
                          : location.title === 'office'
                            ? 'briefcase-outline'
                            : 'location-outline'
                      }
                      size={24}
                      color="forestgreen"
                    />
                  </View>
                  <View style={styles.locationDetails}>
                    <View style={styles.locationHeader}>
                      <Text style={styles.locationTitle}>
                        {location.customName ? location.customName : location.title}
                      </Text>
                      <Text style={styles.locationType}>
                        {location.locationType === 'primary'
                          ? 'Primary'
                          : location.locationType === 'secondary'
                            ? 'Secondary'
                            : 'Other'}
                      </Text>
                    </View>
                    <Text style={styles.locationAddress}>({location.flatNumber}), {location.address}, {location.landmark}, {location.localGovernment}</Text>
                    <Text style={styles.locationLandmark}>{location.state}</Text>
                    {/* Hospital Info (optional) */}
                    {location.hospitalName ? (
                      <Text style={styles.hospitalInfo}><Text style={{ fontWeight: 'bold' }}>Hospital:</Text> {location.hospitalName}</Text>
                    ) : null}
                    {location.hospitalAddress ? (
                      <Text style={styles.hospitalInfo}><Text style={{ fontWeight: 'bold' }}>Hospital Address:</Text> {location.hospitalAddress}</Text>
                    ) : null}
                    {location.patientId ? (
                      <Text style={styles.hospitalInfo}><Text style={{ fontWeight: 'bold' }}>Patient ID:</Text> {location.patientId}</Text>
                    ) : null}
                  </View>
                  <View style={styles.selectButton}>
                    <Ionicons name="chevron-forward" size={20} color="forestgreen" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.findNearMeContainer}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  style={styles.findNearMeButton}
                  onPress={handleFindNearMe}
                >
                  <Ionicons name="location" size={24} color="#fff" />
                  <Text style={styles.findNearMeText}>Use Current Location</Text>
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.helperText}>
                Emergency services will locate you automatically
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 84.6272,
    height: 84.6272,
    borderWidth: 4.922,
    borderColor: '#009444',
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#009444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  helpText: {
    fontFamily: 'Inter',
    fontSize: 9.844,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#009444',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  emergencyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  emergencyNoticeText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  locationsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBFFEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationDetails: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  locationType: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'forestgreen',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: '600',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    lineHeight: 18,
  },
  locationLandmark: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  selectButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DBFFEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  findNearMeContainer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  findNearMeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 8,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  findNearMeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  hospitalInfo: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
  },
});

SOSButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SOSButton;