import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import firestore from '@react-native-firebase/firestore'
import TodoApp from './src/screens/TodoApp';

export default function App() {

  return (
    <View style={styles.container}>
        <TodoApp />
    </View>
    //<Login />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
