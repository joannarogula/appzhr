import React, { useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { UserContext } from '../../context/UserContext';

 function LoginScreen(props: {
  onLogin: (email: string, password: string) => void;
  navigation: any;
}) {

  const { onLogin, navigation } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
 

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
      return;
    }

    props.onLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zaloguj się</Text>

       <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Zaloguj" onPress={handleLogin} />

      <Text style={styles.footer}>
        Nie masz konta? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Zarejestruj się</Text>
      </Text> 
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.Background,
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
    backgroundColor: Colors.Background,
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
