import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const GeneralCommunityScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>General Community</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for previous discussions"
            placeholderTextColor="#999"
          />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Sep 10th post */}
          <Text style={styles.dateHeader}>Sep 10th</Text>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                // eslint-disable-next-line no-undef
                source={require('../../assets/GHProf.png')} // Replace with your image
                style={styles.profileImage}
              />
              <View style={styles.postHeaderText}>
                <Text style={styles.userName}>Gift Haruna</Text>
                <Text style={styles.postTime}>8:45am</Text>
              </View>
            </View>
            <Text style={styles.postContent}>
              Hanging out with friends is always fun, but sometimes Sickle cell
              can throw a curve ball. How do you balance your social life with
              your health. Any advice?
            </Text>
            <Text style={styles.hashtags}>#SickleAidOnTour #S24</Text>

            <View style={styles.interactionBar}>
              <View style={styles.reactionContainer}>
                <Text style={styles.thumbsUp}>👍</Text>
                <Text style={styles.reactionCount}>4</Text>
              </View>
              <View style={styles.reactionContainer}>
                <Text style={styles.heart}>❤️</Text>
                <Text style={styles.reactionCount}>2</Text>
              </View>
              <View style={styles.replyContainer}>
                <Image
                  // eslint-disable-next-line no-undef
                  source={require('../../assets/JOProf.png')} // Replace with your image
                  style={styles.replyProfileImage}
                />
                <Text style={styles.replyText}>1 reply</Text>
                <Text style={styles.replyDate}>Sep. 11th...</Text>
              </View>
            </View>
          </View>

          {/* Sep 12th post */}
          <Text style={styles.dateHeader}>Sep 12th</Text>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                // eslint-disable-next-line no-undef
                source={require('../../assets/GHProf.png')} // Replace with your image
                style={styles.profileImage}
              />
              <View style={styles.postHeaderText}>
                <Text style={styles.userName}>James Olam</Text>
                <Text style={styles.postTime}>12:10pm</Text>
              </View>
            </View>
            <Text style={styles.postContent}>
              This event was so impactful, we received co-sponsorship from Food
              Concepts/ Chicken Republic, who generously provide food packs for
              all participants.
            </Text>
            <Text style={styles.hashtags}>#SickleAidOnTour #S24</Text>

            <View style={styles.interactionBar}>
              <View style={styles.reactionContainer}>
                <Text style={styles.thumbsUp}>👍</Text>
                <Text style={styles.reactionCount}>4</Text>
              </View>
              <View style={styles.reactionContainer}>
                <Text style={styles.heart}>❤️</Text>
                <Text style={styles.reactionCount}>2</Text>
              </View>
              <View style={styles.replyContainer}>
                <Image
                  // eslint-disable-next-line no-undef
                  source={require('../../assets/JOProf.png')} // Replace with your image
                  style={styles.replyProfileImage}
                />
                <Text style={styles.replyText}>2 reply</Text>
                <Text style={styles.replyDate}>Sep. 11th...</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.floatingButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  content: {
    paddingBottom: 80,
  },
  dateHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
  },
  postTime: {
    color: '#777',
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 6,
  },
  hashtags: {
    color: '#1DA1F2',
    fontSize: 14,
    marginBottom: 8,
  },
  interactionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  thumbsUp: {
    fontSize: 16,
    marginRight: 4,
  },
  heart: {
    fontSize: 16,
    marginRight: 4,
  },
  reactionCount: {
    fontSize: 14,
    color: '#777',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  replyProfileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  replyText: {
    fontSize: 14,
    color: '#777',
    marginRight: 4,
  },
  replyDate: {
    fontSize: 12,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default GeneralCommunityScreen;
