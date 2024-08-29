import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import HeaderCard from '../components/HeaderCard';

/**
 *
 * TODO
 * Change Gift to users name
 */
function MainScreen() {
  const { wrapper, baseText, headerText, bodyText, container, headerContainer } = styles;
  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        <View style={headerContainer}>
          <Text style={[baseText, headerText]}>SickleAid</Text>
          <Text style={[baseText, bodyText]}>Good Morning Gift</Text>
        </View>
        <HeaderCard headingText={'Booster'} mainText={'Taking 2.5gms of protein everyday could maintain steeze'} />
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
    paddingTop: 64.98,
    paddingHorizontal: 21
  },
  headerContainer: {
    alignSelf: 'flex-start',
    gap: 7
  },
  baseText: {
    fontFamily: 'Inter',
  },
  headerText: {
    color: '#332E0E',
    fontSize: 36.279,
    fontWeight: 600,
  },
  bodyText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: 0.64,
  },
});

export default MainScreen;
