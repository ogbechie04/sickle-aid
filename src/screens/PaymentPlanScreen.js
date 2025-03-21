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

const PaymentPlanScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user profile from database
  useEffect(() => {
    // Replace this with your actual database fetch
    const fetchUserProfile = async () => {
      try {
        // Mock data - replace with actual API call
        const userData = {
          name: 'Gift Haruna',
          // eslint-disable-next-line no-undef
          profileImage: require('../../assets/GHProf.png'), // Replace with your image path
          verified: true,
        };

        setUserProfile(userData);
        // Set a default selected plan - you might want to fetch this from user preferences
        setSelectedPlan('annually');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    // You might want to save this selection to your database
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Preferences')}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={userProfile.profileImage}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.profileName}>{userProfile.name}</Text>
                {userProfile.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Plan Selection Header */}
          <Text style={styles.planHeader}>Chose your plan</Text>

          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.selectedPlanCard,
            ]}
            onPress={() => handlePlanSelection('monthly')}
          >
            <View style={styles.planLeftSection}>
              <Ionicons name="person" size={32} color="#333" />
              <Text style={styles.planTypeText}>Monthly</Text>
            </View>
            <View style={styles.planRightSection}>
              <View style={styles.planPriceContainer}>
                <Text style={styles.planPrice}>₦500/</Text>
                <Text style={styles.planPeriod}>Monthly</Text>
              </View>
              <Text style={styles.planDescription}>
                Secure payment flow through a trusted payment gateway.
              </Text>
              <View style={styles.planSelectionRow}>
                <Text style={styles.planSelectionText}>Chose this plan</Text>
                <Ionicons name="checkmark" size={24} color="#333" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Quarterly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'quarterly' && styles.selectedPlanCard,
            ]}
            onPress={() => handlePlanSelection('quarterly')}
          >
            <View style={styles.planLeftSection}>
              <Ionicons name="people" size={32} color="#333" />
              <Text style={styles.planTypeText}>Quarterly</Text>
            </View>
            <View style={styles.planRightSection}>
              <View style={styles.planPriceContainer}>
                <Text style={styles.planPrice}>₦2000/</Text>
                <Text style={styles.planPeriod}>Quarterly</Text>
              </View>
              <Text style={styles.planDescription}>
                Secure payment flow through a trusted payment gateway.
              </Text>
              <View style={styles.planSelectionRow}>
                <Text style={styles.planSelectionText}>Chose this plan</Text>
                <Ionicons name="checkmark" size={24} color="#333" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Annual Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              styles.annualPlanCard,
              selectedPlan === 'annually' && styles.selectedAnnualPlanCard,
            ]}
            onPress={() => handlePlanSelection('annually')}
          >
            <View style={styles.planLeftSection}>
              <Ionicons
                name="people"
                size={32}
                color={selectedPlan === 'annually' ? '#fff' : '#FFD700'}
              />
              <Text
                style={[
                  styles.planTypeText,
                  selectedPlan === 'annually' && styles.annualPlanText,
                ]}
              >
                Annually
              </Text>
            </View>
            <View style={styles.planRightSection}>
              <View style={styles.planPriceContainer}>
                <Text
                  style={[
                    styles.planPrice,
                    selectedPlan === 'annually' && styles.annualPlanText,
                  ]}
                >
                  ₦7500/
                </Text>
                <Text
                  style={[
                    styles.planPeriod,
                    selectedPlan === 'annually' && styles.annualPlanText,
                  ]}
                >
                  Annually
                </Text>
              </View>
              <Text
                style={[
                  styles.planDescription,
                  selectedPlan === 'annually' && styles.annualPlanText,
                ]}
              >
                Secure payment flow through a trusted payment gateway.
              </Text>
              <View style={styles.planSelectionRow}>
                <Text
                  style={[
                    styles.planSelectionText,
                    selectedPlan === 'annually' && styles.annualPlanText,
                  ]}
                >
                  Chose this plan
                </Text>
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={selectedPlan === 'annually' ? '#fff' : '#333'}
                />
              </View>
            </View>
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
  content: {
    paddingBottom: 80,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F7F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
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
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },
  verifiedBadge: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planHeader: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F7F4',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  selectedPlanCard: {
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  annualPlanCard: {
    backgroundColor: '#16A34A',
  },
  selectedAnnualPlanCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  planLeftSection: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTypeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  planRightSection: {
    flex: 1,
    paddingLeft: 16,
  },
  planPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  planPeriod: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  planSelectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planSelectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  annualPlanText: {
    color: '#fff',
  },
});

export default PaymentPlanScreen;
