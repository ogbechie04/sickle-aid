import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ButtonComp from './Button';
import commImage from '../../assets/comm.png';

function CommunitySection() {
  const {
    communityContainer,
    commImageTextContainer,
    communityTextContainer,
    baseText,
    communityHeader,
    communityText,
    communityImage,
    communityButtonContainer,
    enterButton,
    enterButtonText,
    buttonTextStyle,
    buttonSpacing,
    joinButton,
    yellowButtonText,
  } = styles;
  return (
    <View style={communityContainer}>
      {/* ----- community text ----- */}
      <View style={commImageTextContainer}>
        <View style={communityTextContainer}>
          <Text style={[baseText, communityHeader]}>In a community?</Text>
          <Text style={[baseText, communityText]}>
            Join conversations, ask questions, and be in the know!
          </Text>
        </View>
        <Image style={communityImage} source={commImage} />
      </View>
      {/* ----- community buttons ----- */}
      <View style={communityButtonContainer}>
        <ButtonComp
          buttonSpacing={[enterButton]}
          buttonText={'Enter'}
          buttonTextStyle={[baseText, buttonTextStyle, enterButtonText]}
        />
        <ButtonComp
          buttonSpacing={[buttonSpacing, joinButton]}
          buttonText={'Join'}
          buttonTextStyle={[baseText, buttonTextStyle, yellowButtonText]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //* ----- community section ----- */
  communityContainer: {
    width: '100%',
    backgroundColor: '#0B9444',
    borderRadius: 8,
    paddingTop: 5.86,
    paddingBottom: 33.95,
    paddingLeft: 19.5,
    paddingRight: 11.36,
  },
  commImageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16.5,
  },
  communityTextContainer: {
    gap: 10.5,
    maxWidth: 208,
  },
  communityHeader: {
    color: '#FFFADE',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.8,
  },
  communityText: {
    color: '#FFFADE',
    fontSize: 13,
    letterSpacing: 0.52,
  },
  communityButtonContainer: {
    flexDirection: 'row',
    gap: 18,
    paddingTop: 20.05,
  },
  joinButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  enterButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 18.5,
  },
  enterButtonText: {
    color: '#009444',
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
export default CommunitySection;
