import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../theme';


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran domowy</Text>
  </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primary,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.primary,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
