import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const PasswordStrengthMeter = ({ password = '' }) => {
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (pwd) => {
    let score = 0;

    // Length criteria
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;

    // Complexity criteria
    if (/[A-Z]/.test(pwd)) score += 1; // Uppercase letter
    if (/[a-z]/.test(pwd)) score += 1; // Lowercase letter
    if (/[0-9]/.test(pwd)) score += 1; // Number
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // Special character

    // Determine strength
    let label = '';
    if (score === 0) {
      label = 'Very Weak';
    } else if (score <= 2) {
      label = 'Weak';
    } else if (score <= 4) {
      label = 'Moderate';
    } else {
      label = 'Strong';
    }

    setStrength(score);
    setStrengthLabel(label);
  };

  const getStrengthColor = () => {
    switch (strengthLabel) {
      case 'Very Weak': return 'red';
      case 'Weak': return 'orange';
      case 'Moderate': return 'yellow';
      case 'Strong': return 'green';
      default: return 'gray';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.strengthBarContainer}>
        {[1, 2, 3, 4].map((segment) => (
          <View
            key={segment}
            style={[
              styles.strengthSegment,
              {
                backgroundColor: segment <= strength 
                  ? getStrengthColor() 
                  : 'lightgray'
              }
            ]}
          />
        ))}
      </View>
      <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
        {strengthLabel}
      </Text>
    </View>
  );
};

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  strengthBarContainer: {
    flexDirection: 'row',
    height: 10,
    marginBottom: 5,
  },
  strengthSegment: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 5,
  },
  strengthText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PasswordStrengthMeter;