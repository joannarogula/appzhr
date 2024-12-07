import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import config from '../config'; // Importowanie konfiguracji z adresem API
import {Colors, FontSizes, Spacing} from '../theme';
import {getUserId} from '../asyncStorage';

const ChangePasswordScreen: React.FC = ({navigation}: any) => {
    const [userId, setUserId] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId(); // Pobierz userId
        if (!id) {
          throw new Error('Nie znaleziono userId w AsyncStorage');
        }
        setUserId(id); // Ustaw userId w stanie
      } catch (error) {
        console.error('Błąd pobierania userId:', error);
        Alert.alert('Błąd', 'Nie udało się pobrać danych użytkownika.');
      }
    };

    fetchUserId();
  }, []);

  //   const navigation = useNavigation();

  const handleChangePassword = async () => {
    // Sprawdzenie, czy hasła są takie same
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Błąd', 'Nowe hasła nie są takie same.');
      return;
    }

    // Sprawdzenie, czy pola są wypełnione
    if (!currentPassword || !newPassword) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      // Wysyłanie zapytania do API z danymi użytkownika
      const response = await fetch(`${config.API_URL}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        Alert.alert('Sukces', 'Hasło zostało zmienione.');
        navigation.goBack(); // Powrót do poprzedniego ekranu
      } else {
        const errorData = await response.json();
        Alert.alert(
          'Błąd',
          errorData.message || 'Nie udało się zmienić hasła.',
        );
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił problem podczas zmiany hasła.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zmień hasło</Text>
      <Text style={styles.middle}>
        Zaktualizuj swoje hasło, aby zwiększyć bezpieczeństwo.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Obecne hasło"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Nowe hasło"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Potwierdź nowe hasło"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.addButton} onPress={handleChangePassword}>
        <Text style={styles.addButtonText}>Zmień hasło</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Nie chcesz zmieniać hasła?{' '}
        <Text style={styles.link} onPress={() => navigation.goBack()}>
          Wróć
        </Text>
      </Text>
    </View>
  );
};

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
  middle: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.secondary,
    textAlign: 'center',
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
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default ChangePasswordScreen;
