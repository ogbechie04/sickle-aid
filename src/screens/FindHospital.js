import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';


const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidmljdG9yMXYxIiwiYSI6ImNtNXRvdzd0MTB1dnkya3F1ZXR3aWE3ZWQifQ.F2VfRfdJd1ZXYVWvbgPoSw';
MapboxGL.setWellKnownTileServer('Mapbox'); 
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const AddressSelector = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const searchNearbyPlaces = async (query) => {
    if (!userLocation || query.length < 3) return;

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
      const params = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        proximity: `${userLocation.longitude},${userLocation.latitude}`,
        types: 'address',
        limit: 5,
      });

      const response = await fetch(`${endpoint}?${params}`);
      const data = await response.json();

      setSearchResults(
        data.features.map((feature) => ({
          id: feature.id,
          placeName: feature.place_name,
          coordinates: feature.geometry.coordinates,
        }))
      );
    } catch (error) {
      console.error('Error searching places:', error);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setSearchResults([]);
    setSearchQuery('');
  };

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.UserLocation visible={true} />
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={[userLocation.longitude, userLocation.latitude]}
        />

        {selectedAddress && (
          <MapboxGL.PointAnnotation
            id="selectedAddress"
            coordinate={selectedAddress.coordinates}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker} />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an address..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchNearbyPlaces(text);
          }}
        />

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            style={styles.resultsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleAddressSelect(item)}
              >
                <Text>{item.placeName}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchInput: {
    padding: 15,
    fontSize: 16,
  },
  resultsList: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default AddressSelector;
