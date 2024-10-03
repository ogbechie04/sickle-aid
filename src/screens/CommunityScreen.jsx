import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import heroImage from '../../assets/comm-hero.png';

function Community(props) {
  const { navigation } = props;
  const {
    wrapper,
    container,
    headingContainer,
    baseText,
    headerText,
    heroContainer,
    heroHeading,
    heroBodyText,
    imageContainer,
    image,
    heroTextContainer,
  } = styles;
  return (
    <SafeAreaView style={wrapper}>
      <View style={container}>
        {/* ----- Header Section ----- */}
        <View style={headingContainer}>
          <Feather
            name="chevron-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={[baseText, headerText]}>Community</Text>
        </View>
        {/* ----- Hero Section ----- */}
        <View style={heroContainer}>
          <View style={imageContainer}>
            <Image source={heroImage} style={image} />
          </View>
          <View style={heroTextContainer}>
            <Text style={heroHeading}>Join the conversation</Text>
            <Text style={heroBodyText}>
              Here are tailored communities associated with your profile. Feel
              free to ask and share experiences.
            </Text>
          </View>
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    zIndex: 1,
  },
  baseText: {
    fontFamily: 'Inter',
  },
  headerText: {
    color: '#332E0E',
    fontSize: 20,
    fontWeight: 700,
  },
  heroContainer: {
    marginTop: 19.69,
    display: 'flex',
    gap: 12.52,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#999985',
    // alignItems: 'stretch',
  },
  imageContainer: {
    width: '100%',
    borderRadius: 8,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  heroTextContainer: {
    paddingLeft: 19,
    paddingRight: 30,
    paddingBottom: 18,
    display: 'flex',
    gap: 8.44,
  },
  heroHeading: {
    fontSize: 20,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  heroBodyText: {
    fontSize: 12,
  },
});

export default Community;
