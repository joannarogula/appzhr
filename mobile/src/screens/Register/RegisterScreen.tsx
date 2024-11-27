import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import bcrypt from 'bcryptjs'; // Importowanie bcryptjs
import config from '../../config'; // Importowanie konfiguracji z adresem API
import {useNavigation} from '@react-navigation/native';
import {Colors, FontSizes, Spacing} from '../../theme';

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Sprawdzenie, czy hasła są takie same
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła nie są takie same.');
      return;
    }

    // Sprawdzenie, czy pola są wypełnione
    if (!email || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      // Haszowanie hasła przed wysłaniem do serwera
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Wysyłanie zapytania do API z danymi użytkownika
      const response = await fetch(`${config.API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 201) {
        Alert.alert('Sukces', 'Rejestracja zakończona sukcesem!');
        // navigation.navigate('Login');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił problem podczas rejestracji.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Potwierdź hasło"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.addButton} onPress={handleRegister}>
        <Text style={styles.addButtonText}>Zarejestruj</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Masz już konto?{' '}
        <Text style={styles.link} onPress={() => navigation.goBack()}>
          Zaloguj się
        </Text>
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
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: FontSizes.title,
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
    backgroundColor: Colors.white,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.small,
    borderRadius: 8,
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
