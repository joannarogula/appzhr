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
import DateTimePicker from '@react-native-community/datetimepicker';
import {getBadges} from '../../api/api';
import {Picker} from '@react-native-picker/picker';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type AddBadgeScreenRouteProp = RouteProp<ParamListBase, 'AddBadgeScreen'>;
type AddBadgeScreenNavigationProp = StackNavigationProp<
  ParamListBase,
  'AddBadgeScreen'
>;

type AddBadgeScreenProps = {
  route: AddBadgeScreenRouteProp;
  navigation: AddBadgeScreenNavigationProp;
};

const AddBadgeScreen: React.FC<AddBadgeScreenProps> = ({route, navigation}) => {
  const {id} = route.params as {id: string};
  // const AddBadgeScreen: React.FC = ({ navigation }: any) => {
  //   const [name, setName] = useState('');
  const [creationDate, setCreationDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [badges, setBadges] = useState<any[]>([]);
  const [selectedBadgeId, setSelectedBadgeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        await getBadges(setBadges);
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się pobrać danych sprawności');
      }
    };

    fetchBadges();
  }, []);

  const handleAddBadge = async () => {
    try {
      const newDate = creationDate.toISOString().split('T')[0];
      const response = await fetch(`${config.API_URL}/badges`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          badgeId: String(selectedBadgeId),
          scoutId: parseInt(id, 10),
          newDate,
        }),
      });

      if (response.ok) {
        Alert.alert('Sukces', 'Dodano sprawność');
        navigation.goBack();
      } else {
        throw new Error('Nie udało się dodać sprawności');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Podaj poprawne dane sprawności');
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
      <Text style={styles.title}>Dodaj nową sprawność</Text>
      <Picker
        selectedValue={selectedBadgeId}
        onValueChange={itemValue => setSelectedBadgeId(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Wybierz sprawność" value={null} />
        {badges.map(badge => (
          <Picker.Item key={badge.id} label={badge.name} value={badge.id} />
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddBadge}>
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

export default AddBadgeScreen;
