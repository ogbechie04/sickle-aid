import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:0812 345 6789');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@sickleaid.com');
  };

  const faqs = [
    {
      question:
        'What first aid measures can I carry out in case of an emergency?',
      answer:
        'In a sickle cell crisis emergency: ensure the person stays hydrated, provide pain medication as prescribed, apply warm compresses to painful areas, encourage rest, and seek immediate medical attention if symptoms worsen or include fever, severe pain, difficulty breathing, or sudden weakness.',
    },
    {
      question: 'How can I prevent complications during an emergency?',
      answer:
        "To prevent complications: act quickly at the first sign of crisis, follow the patient's care plan exactly, maintain proper hydration, avoid temperature extremes, ensure oxygen levels are monitored if possible, and contact medical professionals early rather than waiting until symptoms become severe.",
    },
    {
      question:
        'How can I maximize the use of the information I find on the community in this space?',
      answer:
        'To maximize community information: save critical posts for offline access, create a personal emergency plan based on shared experiences, connect with local support groups, verify medical information with healthcare providers, and contribute your own experiences to help others.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="How are we doing?"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Feather name="mic" size={20} color="#888" style={styles.micIcon} />
        </View>

        <View style={styles.faqContainer}>
          <Text style={styles.sectionTitle}>FAQs</Text>

          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleFaq(index)}
              >
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <Feather
                  name={expandedFaq === index ? 'minus' : 'plus'}
                  size={24}
                  color="#444"
                />
              </TouchableOpacity>

              {expandedFaq === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.sectionTitle}>Contact Support</Text>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleCallSupport}
          >
            <Feather name="phone" size={24} color="#444" />
            <Text style={styles.contactText}>0812 345 6789</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <Text style={styles.orText}>OR</Text>
          </View>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleEmailSupport}
          >
            <Feather name="mail" size={24} color="#444" />
            <Text style={styles.contactText}>support@sickleaid.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    backgroundColor: '#fff',
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  micIcon: {
    marginLeft: 8,
  },
  faqContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#f2f9f2',
    borderRadius: 12,
    padding: 16,
  },
  contactContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#f2f9f2',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'right',
  },
  faqItem: {
    marginBottom: 12,
    borderBottomWidth: 0,
    borderBottomColor: '#e0e0e0',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    flex: 1,
    paddingRight: 12,
  },
  faqAnswer: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 16,
    color: '#444',
  },
  orContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  orText: {
    fontSize: 18,
    color: '#555',
  },
  spacer: {
    height: 80,
  },
});

export default ContactScreen;
