/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommunityScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          // eslint-disable-next-line no-undef
          source={require('../../assets/communitypic.png')}
          style={styles.image}
        />
        <Text style={styles.title}>COMMUNITY</Text>
        <Text style={styles.description}>
          A dedicated community platform with secure chat functionalities.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
          <Text
            style={styles.skipText}
            onPress={() => navigation.navigate('SignUp')}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pagination}>
        <View style={styles.paginationDot} />
        <View style={styles.paginationDot} />
        <View style={[styles.paginationDot, styles.activeDot]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'mintcream',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: 293.34,
    height: 217.48,
    borderRadius: 90,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'forestgreen',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 16,
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default CommunityScreen;
