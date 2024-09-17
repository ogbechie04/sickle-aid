import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OnboardingScreen = () => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
<View style={styles.content}>
        <Image
          // eslint-disable-next-line no-undef
          source={require('../../assets/childonboard.png')}
          style={styles.image}
        />
        <Text style={styles.title}>PSC</Text>
        <Text style={styles.description}>
          Making it easier for people with sickle cell to get the medical help they need, especially during a crisis.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}
          onPress={() => navigation.navigate('LovedOnes')}
          >Next</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pagination}>
        <View style={[styles.paginationDot, styles.activeDot]} />
        <View style={styles.paginationDot} />
        <View style={styles.paginationDot} />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'palegoldenrod',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
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

export default OnboardingScreen;