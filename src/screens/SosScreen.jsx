import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import SOSLocationCard from '../components/SosLocationSection';
import PropTypes from 'prop-types';

/**
 *
 * TODO:
 *
 */

function SosScreen(props) {
  const { navigation } = props;
  const {
    container,
    wrapper,
    headingContainer,
    baseText,
    headerText,
    headerBaseText,
    locationContainer,
    divider,
    cardContainer,
    iconContainer,
    editIcon,
    addIcon,
    cardText,
    addEditContainer,
  } = styles;
  return (
    <SafeAreaView style={wrapper}>
      <ScrollView>
        <View style={container}>
          {/* ----- HEADER SECTION ----- */}
          <View style={headingContainer}>
            <Feather
              name="chevron-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
            <Text style={[baseText, headerText]}>SOS</Text>
            <Text style={[baseText, headerBaseText]}>
              Find a location near me
            </Text>
          </View>
          {/* ----- LOCATION SECTION ----- */}
          <View style={locationContainer}>
            <SOSLocationCard />
          </View>
          <View style={divider}></View>
          {/* ----- ADD & EDIT SECTION ----- */}
          <View style={addEditContainer}>
            <TouchableOpacity style={cardContainer}>
              <View style={iconContainer}>
                <Feather
                  name="plus"
                  size={32}
                  style={addIcon}
                  color={'#ffffff'}
                />
              </View>
              <Text style={cardText}>Add Location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={cardContainer}>
              <View style={iconContainer}>
                <Feather
                  name="edit-2"
                  size={24}
                  style={editIcon}
                  color={'#ffffff'}
                />
              </View>
              <Text style={cardText}>Edit Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  headingContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  baseText: {
    fontFamily: 'Inter',
  },
  headerText: {
    paddingTop: 10,
    color: '#332E0E',
    fontSize: 32,
    fontWeight: 600,
  },
  headerBaseText: {
    color: '#332E0E',
    fontSize: 16,
  },
  locationContainer: {
    marginTop: 25,
    width: '100%',
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#332e0e80',
    marginTop: 27.59,
  },
  addEditContainer: {
    width: '100%',
    borderRadius: 8,
    alignItems: 'flex-start',
    gap: 8.26,
    marginTop: 34.37,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24.4,
    width: '100%',
    alignSelf: 'flex-start',
  },
  iconContainer: {
    borderRadius: 14.2,
    backgroundColor: '#332e0ecc',
  },
  addIcon: {
    padding: 8,
  },
  editIcon: {
    padding: 12,
  },
  cardText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12.224,
    color: '#332E0E',
    lineHeight: 16.298,
    letterSpacing: 0.489,
  },
});

SosScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SosScreen;
