import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

function SOSLocationCard(props) {
  const {
    container,
    cardContainer,
    cardText,
    iconContainer,
    homeIcon,
    officeIcon,
    searchIcon,
  } = styles;
  return (
    <View style={container}>
      <TouchableOpacity style={cardContainer}>
        <View style={iconContainer}>
          <Feather name="home" size={48} style={homeIcon} />
        </View>
        <Text style={cardText}>My Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={cardContainer}>
        <View style={iconContainer}>
          <Feather name="briefcase" size={48} style={officeIcon} />
        </View>
        <Text style={cardText}>My Office</Text>
      </TouchableOpacity>
      <TouchableOpacity style={cardContainer}>
        <View style={iconContainer}>
          <Feather name="search" size={48} style={searchIcon} />
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
    gap: 32,
  },
  cardTitle: {
    fontSize: 20,
    color: '#332E0E',
    fontWeight: '600',
    marginBottom: 8,
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
    gap: 48,
    width: '100%',
    alignSelf: 'flex-start',
  },
  iconContainer: {
    borderRadius: 27.9,
    borderColor: '#000000',
    borderWidth: 6,
  },
  homeIcon: {
    padding: 24,
  },
  officeIcon: {
    padding: 28.05,
  },
  searchIcon: {
    paddingTop: 27.86,
    paddingLeft: 28.52,
    paddingRight: 27.58,
    paddingBottom: 28.24,
  },
});

export default SOSLocationCard;
