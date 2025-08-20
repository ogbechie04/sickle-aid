import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInOptionsScreen = () => {
  const navigation = useNavigation();
  const [selectedRelation, setSelectedRelation] = useState('');

  const handlePSCPress = () => {
    setSelectedRelation('PSC');
  };

  const handlePickerChange = (itemValue) => {
    setSelectedRelation(itemValue);
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('selectedRelation', selectedRelation);
      if (selectedRelation === 'PSC') {
        navigation.navigate('PersonalInfo', {
          relation: selectedRelation,
          editable: true,
          fromOnboarding: true,
        });
      } else if (selectedRelation) {
        navigation.navigate('RelationInfo', { relation: selectedRelation });
      }
    } catch (error) {
      console.error('Error storing relation in AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select the applicable option</Text>
      <Text style={styles.instructionText}>Choose one of the following:</Text>

      <View style={styles.optionGroup}>
        <Text style={styles.optionLabel}>I am a Person with Sickle Cell:</Text>
        <TouchableOpacity
          style={[
            styles.PSC,
            selectedRelation === 'PSC' && styles.selectedOption,
          ]}
          onPress={handlePSCPress}
        >
          <Text style={styles.PSCText}>Person with Sickle Cell (PSC)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.optionGroup}>
        <Text style={styles.optionLabel}>I am a (select relationship):</Text>
        <View
          style={[
            styles.pickerContainer,
            selectedRelation !== 'PSC' &&
              selectedRelation !== '' &&
              styles.selectedOption,
          ]}
        >
          <Picker
            selectedValue={selectedRelation === 'PSC' ? '' : selectedRelation}
            onValueChange={handlePickerChange}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Relation" value="" color="#888" />
            <Picker.Item label="Loved Ones" value="Loved Ones" />
            <Picker.Item label="Wife" value="Wife" />
            <Picker.Item label="Husband" value="Husband" />
            <Picker.Item label="Dad" value="Dad" />
            <Picker.Item label="Mum" value="Mum" />
            <Picker.Item
              label="Not a direct relative"
              value="Not a direct relative"
            />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !selectedRelation && { opacity: 0.5 }]}
        onPress={handleSubmit}
        disabled={!selectedRelation}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 40.58,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionGroup: {
    width: '100%',
    marginBottom: 8,
    paddingTop: 4,
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 4,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  PSC: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  PSCText: {
    color: 'black',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: 'palegoldenrod',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 50,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    color: 'black',
  },
  selectedOption: {
    borderLeftWidth: 5,
    borderLeftColor: 'forestgreen',
    backgroundColor: '#eafbe7',
  },
  submitButton: {
    backgroundColor: 'forestgreen',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    borderRadius: 71,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default SignInOptionsScreen;
