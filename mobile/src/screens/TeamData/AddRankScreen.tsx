import React, { useEffect, useState } from 'react';
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
import { getRanks } from '../../api/api';
import { Picker } from '@react-native-picker/picker';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// type AddRankScreenRouteProp = RouteProp<ParamListBase, 'Ranks'>;
// type AddRankScreenNavigationProp = StackNavigationProp<ParamListBase, 'Ranks'>;

// type AddRankScreenProps = {
//   route: AddRankScreenRouteProp;
//   navigation: AddRankScreenNavigationProp; // Dodajemy navigation
// };

type AddRankScreenRouteProp = RouteProp<ParamListBase, 'AddRankScreen'>;
type AddRankScreenNavigationProp = StackNavigationProp<ParamListBase, 'AddRankScreen'>;

type AddRankScreenProps = {
  route: AddRankScreenRouteProp;
  navigation: AddRankScreenNavigationProp;
};


const AddRankScreen: React.FC<AddRankScreenProps> = ({route, navigation}) => {
    const { id } = route.params as { id: string };
// const AddRankScreen: React.FC = ({ navigation }: any) => {
//   const [name, setName] = useState('');
  const [creationDate, setCreationDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [ranks, setRanks] = useState<any[]>([]); 
  const [selectedRankId, setSelectedRankId] = useState<number | null>(null);


  useEffect(() => {
    const fetchRanks = async () => {
      try {
        await getRanks(setRanks); 
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się pobrać danych zastępów');
      }
    };

    fetchRanks();
  }, []);

  const handleAddRank = async () => {
    try {
      const newDate = (creationDate).toISOString().split('T')[0];
      console.log(`Stopień: ${selectedRankId}, Harcerka: ${id}, Data przyznania: ${newDate}`);

      const response = await fetch(`${config.API_URL}/ranks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({rankId: String(selectedRankId) , scoutId: parseInt(id, 10), newDate}),
      });

      if (response.ok) {
        Alert.alert('Sukces', 'Dodano stopień');
        navigation.goBack();
      } else {
        throw new Error('Nie udało się dodać stopnia');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Podaj poprawne dane stopnia');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Ukryj picker po wyborze daty
    if (selectedDate) {
      // const newDate = new Date(selectedDate.toISOString().split('T')[0]);
      setCreationDate(selectedDate);
      // console.log(creationDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj nowy stopień</Text>
      <Picker
        selectedValue={selectedRankId}
        onValueChange={itemValue => setSelectedRankId(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Wybierz stopień" value={null} />
        {ranks.map(rank => (
          <Picker.Item key={rank.id} label={rank.name} value={rank.id} />
        ))}
      </Picker>

<TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}>
        <Text style={styles.dateButtonText}>
          Wybierz datę: {creationDate.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={creationDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddRank}>
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
  picker: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
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
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddRankScreen;
