import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CommunityPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#5A4F2F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Community</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Intro Card */}
        <View style={styles.card}>
          <Image 
            // eslint-disable-next-line no-undef
            source={require('../../assets/hands.png')} // Replace with your image
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Join the conversation</Text>
            <Text style={styles.cardText}>
              Here are tailored communities associated with your profile. Feel free to ask and share experiences.
            </Text>
          </View>
        </View>

        {/* Community Buttons */}
        <TouchableOpacity style={styles.communityButton}>
          <Text style={styles.communityTitle}>General</Text>
          <Text style={styles.communityDesc}>For general topics and information.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.communityButton}>
          <Text style={styles.communityTitle}>Wives</Text>
          <Text style={styles.communityDesc}>For general topics and information.</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A4F2F',
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#F9F8F8',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A4F2F',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  communityButton: {
    backgroundColor: 'green',
    padding: 16,
    height:108,
    borderRadius: 8,
    marginBottom: 10,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  communityDesc: {
    fontSize: 14,
    color: '#fff',
    paddingBlockStart:20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default CommunityPage;
