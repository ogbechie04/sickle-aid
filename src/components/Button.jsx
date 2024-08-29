import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

function ButtonComp({ title, buttonSpacing }) {
  const { button, buttonText } = styles;
  return (
    <>
      <TouchableOpacity style={[button, buttonSpacing]}>
        <Text style={buttonText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 71,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.64
  }
});

export default ButtonComp;
