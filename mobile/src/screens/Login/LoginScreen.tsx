import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';


function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
  </View>
  )
}

{/* function LoginScreen(props: { onLogin: (email: string, password: string) => void }) {
  let email = '';
  let password = '';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
      return;
    }
    props.onLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => (email = text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        onChangeText={(text) => (password = text)}
        secureTextEntry
      />

      <Button title="Zaloguj" onPress={handleLogin} />

      <Text style={styles.footer}>
        Nie masz konta? <Text style={styles.link} onPress={() => Alert.alert('Rejestracja')}>Zarejestruj się</Text>
      </Text> */}
//     </View>
//   );
// } */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: '#888',
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
