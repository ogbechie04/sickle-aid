import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComp from './src/components/button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto"/>
      <ButtonComp title={'Bad habit'} buttonSpacing={styles.buttonSpace}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpace: {
    paddingHorizontal: 50.5,
    paddingVertical: 10
  }
});