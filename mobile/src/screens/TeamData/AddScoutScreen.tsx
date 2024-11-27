import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Colors, Spacing} from '../../theme';
import config from '../../config';
import {getTeamId} from '../../asyncStorage';
import { Picker } from '@react-native-picker/picker';
import {getPatrols} from '../../api/api';

const AddScoutScreen: React.FC = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [patrols, setPatrols] = useState<any[]>([]); // Przechowywanie zastępów
  const [selectedPatrolId, setSelectedPatrolId] = useState<number | null>(null); // Wybrany zastęp

  useEffect(() => {
    const fetchPatrols = async () => {
      try {
        const teamId = await getTeamId();
        if (!teamId) throw new Error('Brak drużyny');
        await getPatrols(setPatrols, parseInt(teamId, 10)); // Pobierz dane o zastępach
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się pobrać danych zastępów');
      }
    };

    fetchPatrols();
  }, []);

  const handleAddScout = async () => {
    try {
      const teamId = await getTeamId();
      if (!teamId) throw new Error('Brak drużyny');

      if (!selectedPatrolId) {
        Alert.alert('Błąd', 'Wybierz zastęp');
        return;
      }

      const response = await fetch(`${config.API_URL}/scouts`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          telephone,
          birthDate,
          joinDate,
          patrolId: selectedPatrolId,
        }),
      });
      console.log(
        firstName,
        lastName,
        email,
        telephone,
        birthDate,
        joinDate,
        selectedPatrolId,
      );

      if (response.ok) {
        Alert.alert('Sukces', 'Dodano harcerkę');
        navigation.goBack();
      } else {
        throw new Error('Nie udało się dodać harcerki');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj nową harcerkę</Text>
      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazwisko"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={telephone}
        onChangeText={setTelephone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Data urodzenia (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Data przyjęcia do drużyny (YYYY-MM-DD)"
        value={joinDate}
        onChangeText={setJoinDate}
      />

      {/* Lista rozwijana z zastępami */}
      <Picker
        selectedValue={selectedPatrolId}
        onValueChange={itemValue => setSelectedPatrolId(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Wybierz zastęp" value={null} />
        {patrols.map(patrol => (
          <Picker.Item key={patrol.id} label={patrol.name} value={patrol.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.addButton} onPress={handleAddScout}>
        <Text style={styles.addButtonText}>Dodaj</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.addButtonText}>Wróć</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.large,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.medium,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: Spacing.small,
    borderRadius: 8,
    marginBottom: Spacing.medium,
  },
  picker: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: 8,
    marginTop: 12,
  },
  backButton: {
        backgroundColor: Colors.red,
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

export default AddScoutScreen;
