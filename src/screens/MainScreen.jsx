import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HeaderCardCarousel from '../components/HeaderCardCarousel';
import { Feather } from '@expo/vector-icons';
import ButtonComp from '../components/Button';
import CommunitySection from '../components/CommunitySection';

/**
 *
 * TODO: Change Gift to users name
 * TODO: Work on functionality for checkup
 * ? Why is the second divider darker than the first
 */
function MainScreen() {
  const {
    wrapper,
    baseText,
    headerText,
    bodyText,
    container,
    headerContainer,
    carouselContainer,
    divider,
    checkupContainer,
    checkupDateTime,
    checkupDoctor,
    iconContainer,
    buttonTextStyle,
    buttonSpacing,
    checkupDoneContainer,
    communityHeader,
    communityText,
    communityTextContainer,
    communityContainer,
    commImageTextContainer,
    communityImage,
    joinButton,
    enterButton,
    enterButtonText,
    yellowButtonText,
    communityButtonContainer
  } = styles;
  return (
    <SafeAreaView style={wrapper}>
      {/* ----- main container ----- */}
      <View style={container}>
        {/* ----- header content ----- */}
        <View style={headerContainer}>
          <Text style={[baseText, headerText]}>SickleAid</Text>
          <Text style={[baseText, bodyText]}>Good Morning Gift</Text>
        </View>
        <View style={carouselContainer}>
          <HeaderCardCarousel />
        </View>
        <View style={divider}></View>
        {/* ----- checkout section ----- */}
        <View style={checkupContainer}>
          {/* ----- checkout information ----- */}
          <View>
            <Text style={[baseText, bodyText]}>Blood ion checkup</Text>
            <Text style={[baseText, checkupDateTime]}>YYYY-MM-DD | 00:00</Text>
            <Text style={[baseText, checkupDoctor]}>With Dr. Abel Onajin</Text>
          </View>
          {/* ----- checkout edit and done ----- */}
          <View style={checkupDoneContainer}>
            <TouchableOpacity style={iconContainer}>
              <Feather name="edit-2" size={14} color="black" />
            </TouchableOpacity>
            <ButtonComp
              buttonSpacing={buttonSpacing}
              buttonTextStyle={[baseText, buttonTextStyle, yellowButtonText]}
              buttonText={'Done'}
            />
          </View>
        </View>
        <View style={divider}></View>
        <CommunitySection />
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
    paddingHorizontal: 21,
  },
  headerContainer: {
    alignSelf: 'flex-start',
    gap: 7,
  },
  carouselContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 26.09,
    maxHeight: 200,
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
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#332e0e80',
    marginVertical: 10,
  },
  //* ----- checkout section ----- */
  checkupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // borderWidth: 5,
    alignItems: 'center',
  },
  checkupDateTime: {
    fontSize: 12,
    color: '#332E0E',
    marginTop: 4,
  },
  checkupDoctor: {
    fontSize: 13,
    color: '#332E0E',
    marginTop: 7,
    letterSpacing: 0.52,
  },
  checkupDoneContainer: {
    justifyContent: 'space-between',
    gap: 18,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    alignSelf: 'flex-end',
  },
  yellowButtonText: {
    color: '#FFFADE',
  },
  buttonTextStyle: {
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: 0.52,
    textAlign: 'center',
  },
  buttonSpacing: {
    paddingHorizontal: 19,
    paddingVertical: 5,
    backgroundColor: '#0B9444',
  },
});

export default MainScreen;
