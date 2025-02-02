import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

function SOSLocationCard(props) {
  const navigation = useNavigation();

  const {
    container,
    cardContainer,
    cardText,
    iconContainer,
  } = styles;

  return (
    <View style={container}>
      <TouchableOpacity
        style={cardContainer}
        onPress={() => navigation.navigate('HospitalInformation')}
      >
        <View style={iconContainer}>
          <Feather name="home" size={48} color="#000" />
        </View>
        <Text style={cardText}>My Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={cardContainer}
        onPress={() => navigation.navigate('OfficeInformation')}
      >
        <View style={iconContainer}>
          <Feather name="briefcase" size={48} color="#000" />
        </View>
        <Text style={cardText}>My Office</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={cardContainer}
        onPress={() => navigation.navigate('NearbyLocations')}
      >
        <View style={iconContainer}>
          <Feather name="search" size={48} color="#000" />
        </View>
        <Text style={cardText}>Find one near me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    alignItems: 'flex-start',
    marginBottom: 32, // Replace gap
  },
  cardText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    color: '#332E0E',
    lineHeight: 32,
    letterSpacing: 0.96,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32, // Replace gap
    width: '100%',
    alignSelf: 'flex-start',
  },
  iconContainer: {
    borderRadius: 27.9,
    borderColor: '#000000',
    borderWidth: 6,
    padding: 24, // Moved padding here
  },
});

export default SOSLocationCard;
