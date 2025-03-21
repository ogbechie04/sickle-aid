import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Method</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Payment Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => navigation.navigate('PaymentPlanScreen')}
            >
              <View style={styles.optionIcon}>
                <Ionicons name="cash-outline" size={24} color="#16A34A" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Subscription Plans</Text>
                <Text style={styles.optionDesc}>
                  Monthly, quarterly, or annual payment plans
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionIcon}>
                <Ionicons name="card-outline" size={24} color="#16A34A" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Payment Cards</Text>
                <Text style={styles.optionDesc}>
                  Manage your debit/credit cards
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionIcon}>
                <Ionicons
                  name="swap-horizontal-outline"
                  size={24}
                  color="#16A34A"
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Transaction History</Text>
                <Text style={styles.optionDesc}>View your past payments</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Payment Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Payment Information</Text>
            <Text style={styles.infoText}>
              All payments are securely processed through our trusted payment
              gateway partners. Your financial information is encrypted and
              never stored on our servers.
            </Text>
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7F4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDesc: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#F0F7F4',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default PaymentMethodScreen;
