import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

function ButtonComp({ buttonText, buttonSpacing, buttonTextStyle, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, buttonSpacing]} onPress={onPress}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 71,
    backgroundColor: '#0B9444', // Primary green
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0B9444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

ButtonComp.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonSpacing: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  buttonTextStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

export default ButtonComp;

