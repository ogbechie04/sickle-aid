import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user profile from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('user');
        console.log('Fetched userDataString:', userDataString); // <-- Debug log
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log('Parsed userData:', userData); // <-- Debug log
          setUserProfile(userData);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const settingsOptions = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: 'person-outline',
      screen: 'PersonalInfo', // <-- Fix here
    },
    {
      id: 'notification',
      title: 'Notification',
      icon: 'notifications-outline',
      screen: 'NotificationSettings',
    },
    {
      id: 'history',
      title: 'History',
      icon: 'time-outline',
      screen: 'History',
    },
    {
      id: 'location',
      title: 'Location',
      icon: 'location-outline',
      screen: 'LocationSettings',
    },
    {
      id: 'payment',
      title: 'Payment method',
      icon: 'card-outline',
      screen: 'PaymentMethodScreen',
    },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Preferences')}>
            <Ionicons name="settings-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              {userProfile?.profileImage ? (
                <Image
                  source={{ uri: userProfile.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View
                  style={[
                    styles.profileImage,
                    {
                      backgroundColor: '#e0e0e0',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Ionicons name="person" size={48} color="#aaa" />
                </View>
              )}
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>
                  {userProfile?.username || 'User'}
                </Text>
                {userProfile?.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.accountType}>
                Account type - {userProfile?.relation || 'N/A'}
              </Text>
              <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Settings Options */}
          <View style={styles.optionsContainer}>
            {settingsOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => {
                  if (option.id === 'personal') {
                    // Always use this for nested stack navigation from a tab:
                    navigation.navigate('PersonalInfoSettings', {
                      editable: false,
                      fromOnboarding: false,
                    });
                  } else {
                    navigation.navigate(option.screen);
                  }
                }}
              >
                <View style={styles.optionIconContainer}>
                  <Ionicons name={option.icon} size={20} color="#000" />
                </View>
                <Text style={styles.optionText}>{option.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}

            {/* Logout Option */}
            <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="log-out-outline" size={20} color="#000" />
              </View>
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    paddingBottom: 80,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F7F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileInfo: {
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 6,
  },
  verifiedBadge: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountType: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  inviteButton: {
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  inviteButtonText: {
    color: '#16A34A',
    fontSize: 14,
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
});

export default SettingsScreen;
