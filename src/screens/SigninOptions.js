import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SignInOptionsScreen = () => {
  const [selectedRelation, setSelectedRelation] = useState('placeholder');

  const handlePickerChange = (itemValue) => {
    setSelectedRelation(itemValue);
  };

  const handleSubmit = () => {
    // Handle the submit action
    console.log(`Selected Relation: ${selectedRelation}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the applicable option</Text>

      <TouchableOpacity style={styles.PSC}>
        <Text style={styles.PSCText}>Person with Sickle Cell (PSC)</Text>
      </TouchableOpacity>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRelation}
          onValueChange={handlePickerChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Loved Ones" value="placeholder" color="#888" />
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 40.58,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  PSC: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 50,
    marginTop: 50,
    paddingTop: 10,
    paddingLeft: 10,
  },
  PSCText: {
    color: 'black',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: 'palegoldenred',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 50,
    height: 50,
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    color: 'palegoldenred',
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
