import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import boyImage from '../../assets/hero-boy.png';

/**
 *
 * TODO
 * Remove default values for headingText and mainText
 */

function HeaderCard(props) {
  const { headingText = "Music", mainText = "Please dont stop" } = props;
  const { container, containerColor, baseText, headerText, bodyText, textWrapper } = styles;
  return (
    <SafeAreaView>
    <View style={[container, containerColor]}>
      <View style={textWrapper}>
        <Text style={[baseText, headerText]}>{headingText}</Text>
        <Text style={[baseText, bodyText]}>{mainText}</Text>
      </View>
      <View>
        <Image source={boyImage} />
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
    backgroundColor: 'yellow',
    borderRadius: 8,
    paddingLeft: 19,
    width: '100%',
    height: 147
  },
  textWrapper: {
    gap: 9.91,
    alignSelf: 'flex-end',
    paddingBottom: 14.05
  },
  baseText: {
    fontFamily: 'Inter',
    color: '#332E0E',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.8
  },
  bodyText: {
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0.52,
    maxWidth: 174
  },
});

export default HeaderCard;
