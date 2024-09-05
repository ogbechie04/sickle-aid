import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import boyImage from '../../assets/hero-boy.png';

/**
 *
 * TODO
 * Putting individual bgWidth and bgColor for each card
 * TODO: Add box-shadow for the card
 */

function HeaderCard(props) {
  const { headingText, mainText, textColor } = props;
  const {
    container,
    baseText,
    headerText,
    bodyText,
    textWrapper,
    image
  } = styles;
  return (
    <SafeAreaView>
      <View style={[container]}>
        <View style={textWrapper}>
          <Text style={[baseText, headerText, {color: textColor}]}>{headingText}</Text>
          <Text style={[baseText, bodyText, {color: textColor}]}>{mainText}</Text>
        </View>
        <View>
          <Image style={image} source={boyImage} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8,
    paddingLeft: 19,
    width: '100%',
    height: 147,
    // borderWidth: 0.5,
    // borderColor: '#332e0e80',
    backgroundColor: '#F1FAF5',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  textWrapper: {
    gap: 9.91,
    alignSelf: 'flex-end',
    paddingBottom: 14.05,
  },
  baseText: {
    fontFamily: 'Inter',
    color: '#332E0E',
    maxWidth: 174,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.8,
  },
  bodyText: {
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0.52,
  },
  image: {
    alignSelf: 'flex-end',
    resizeMode: 'contain'
  }
});

export default HeaderCard;
