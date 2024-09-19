import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

function ButtonComp({ buttonText, buttonSpacing, buttonTextStyle, onPress }) {
  const { button } = styles;
  return (
      <TouchableOpacity style={[button, buttonSpacing]} onPress={onPress}>
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 71,
  },
});

export default ButtonComp;
