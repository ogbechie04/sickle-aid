import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import { API_KEY } from '@env';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const GOOGLE_API_KEY = API_KEY;
  const nav = useNavigation();

  // Fetch current location and nearby hospitals on page load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission to access location was denied.'
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      setLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetchNearbyHospitals(latitude, longitude);
    })();
  }, []);

  const fetchNearbyHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.results) {
        setHospitals(data.results);
      }
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error('Error with search:', error);
    }
  };

  const handleSuggestionSelect = async (suggestion) => {
    setSearchQuery(suggestion.description);
    setSuggestions([]);
    const placeId = suggestion.place_id; 
    const detailsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
    );
    const detailsData = await detailsResponse.json();
    const { lat, lng } = detailsData.result.geometry.location; // Get latitude and longitude

    
    setSelectedHospital({
      name: suggestion.description, 
      vicinity: detailsData.result.vicinity, 
      latitude: lat,
      longitude: lng,
    });
    setModalVisible(true); 

    // Update the map region
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setModalVisible(true);
  };

  const confirmSelection = () => {
    Alert.alert('Hospital Selected', `Hospital: ${selectedHospital.name}`);
    setModalVisible(false);
    nav.navigate('newscreen');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setSuggestions([])}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => nav.goBack()}
            >
              <Icon name="arrow-left" size={35} color="white" />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder="Search for places..."
              placeholderTextColor="#A9A9A9"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                handleSearch();
              }}
              onFocus={() => setSuggestions([])}
            />
          </View>

          {suggestions.length > 0 && (
            <TouchableWithoutFeedback onPress={() => setSuggestions([])}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionSelect(item)}
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsList}
              />
            </TouchableWithoutFeedback>
          )}

          <MapView
            style={styles.map}
            region={region}
            showsUser
            Location
            onRegionChangeComplete={setRegion}
          >
            {hospitals.map((hospital) => (
              <Marker
                key={hospital.place_id}
                coordinate={{
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                }}
              >
                <Callout onPress={() => handleHospitalClick(hospital)}>
                  <Text>{hospital.name}</Text>
                  <Text>{hospital.vicinity}</Text>
                </Callout>
              </Marker>
            ))}
          </MapView>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => {
              if (location) {
                setRegion({
                  ...region,
                  latitude: location.latitude,
                  longitude: location.longitude,
                });
              }
            }}
          >
            <Icon
              name="location-arrow"
              size={35}
              color="white"
              style={{ fontWeight: '100' }}
            />
          </TouchableOpacity>

          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Confirm selection of: {selectedHospital?.name}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedHospital?.vicinity}
                </Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={confirmSelection}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    borderColor: '#007AFF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 25,
  },
  locationButton: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    elevation: 5,
    right: 20,
  },
  suggestionsList: {
    position: 'absolute',
    top: 80,
    left: 10,
    right: 10,
    zIndex: 2,
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 15,
    borderBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  modalActions: { flexDirection: 'row' },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width: 100,
  },
  confirmButton: { backgroundColor: '#007AFF' },
  cancelButton: { backgroundColor: 'red' },
  buttonText: { color: 'white', textAlign: 'center' },
});
