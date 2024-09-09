import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import SOSLocationCard from '../components/SosLocationCard';

function SosScreen(props) {
    const { navigation } = props;
  const { container, wrapper, headingContainer, baseText, headerText, headerBaseText, locationContainer } = styles;
  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <View style={headingContainer}>
          <Feather
            name="chevron-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={[baseText, headerText]}>SOS</Text>
          <Text style={[baseText, headerBaseText]}>Find a location near me</Text>
        </View>
        <View style={locationContainer}>
            <SOSLocationCard />
        </View>
      </View>
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
    alignItems: 'flex-start'
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
  }
});
export default SosScreen;
