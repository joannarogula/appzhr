import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors, Spacing } from '../../theme';
import config from '../../config';
import { getTeamId } from '../../asyncStorage';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPatrolScreen: React.FC = ({ navigation }: any) => {
  const [name, setName] = useState('');

  const handleAddPatrol = async () => {
    try {
      const teamId = await getTeamId(); // Pobieramy id drużyny
      if (!teamId) throw new Error('Brak drużyny');

      const response = await fetch(`${config.API_URL}/patrols`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, teamId: parseInt(teamId, 10)}),
      });

      if (response.ok) {
        Alert.alert('Sukces', 'Dodano zastęp');
        navigation.goBack();
      } else {
        throw new Error('Nie udało się dodać zastępu');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Podaj poprawne dane zastępu');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj nowy zastęp</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa zastępu"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPatrol}>
        <Text style={styles.addButtonText}>Dodaj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
  addButton: {
    backgroundColor: Colors.secondary,
    padding: Spacing.small,
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

export default AddPatrolScreen;
