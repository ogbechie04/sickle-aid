import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import helpIcon from '../../../assets/icons/help-icon.png';

function HelpButton(props) {
  const { navigation } = props;
  const { container, helpText } = styles;
  return (
    <TouchableOpacity
      style={container}
      onPress={() => navigation.navigate('SOS')}
    >
      <Image source={helpIcon} />
      <Text style={helpText}>Tap {'\n'} Help!!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 84.6272,
    height: 84.6272,
    borderWidth: 4.922,
    borderColor: '#009444',
    borderRadius: 50,
  },
  helpText: {
    fontFamily: 'Inter',
    fontSize: 9.844,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#009444',
  },
});
HelpButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HelpButton;
