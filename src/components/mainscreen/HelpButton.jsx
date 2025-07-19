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

// Remove the hardcoded SAVED_LOCATIONS
// const SAVED_LOCATIONS = [
//   {
//     id: '1',
//     type: 'Primary',
//     title: 'Home',
//     address: 'Flat 2B, Victoria Island, Lagos',
//     landmark: 'Near City Mall',
//     icon: 'home'
//   },
//   {
//     id: '2',
//     type: 'Secondary',
//     title: 'Office',
//     address: '15 Admiralty Way, Lekki Phase 1, Lagos',
//     landmark: 'Opposite Shoprite',
//     icon: 'briefcase'
//   },
//   {
//     id: '3',
//     type: 'Other',
//     title: 'School',
//     address: 'University of Lagos, Akoka, Lagos',
//     landmark: 'Main Campus',
//     icon: 'school'
//   }
// ];

function SOSButton({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [savedLocations, setSavedLocations] = useState([]);

  // Fetch locations from AsyncStorage on mount
  React.useEffect(() => {
    const fetchLocations = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('user');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          // Locations are under userData.user.locations
          const locations = userData?.user?.locations || [];
          setSavedLocations(locations);
        }
      } catch (e) {
        setSavedLocations([]);
      }
    };
    fetchLocations();
  }, []);

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

  const LocationSelectionModal = () => (
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
                    color="#8B6914"
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
                  <Text style={styles.locationAddress}>{location.address}</Text>
                  <Text style={styles.locationLandmark}>{location.landmark}</Text>
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
                  <Ionicons name="chevron-forward" size={20} color="#8B6914" />
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
  );

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handleSOSPress}>
        <Ionicons name="medical" size={32} color="#009444" />
        <Text style={styles.helpText}>Tap {'\n'} Help!!</Text>
      </TouchableOpacity>

      <LocationSelectionModal />
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
    color: '#8B6914',
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
    backgroundColor: '#F8F6F0',
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
    color: '#8B6914',
    backgroundColor: '#F8F6F0',
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
    backgroundColor: '#F8F6F0',
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