import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import config from '../../config';
import { Colors } from '../../theme';

// Typowanie dla parametrów ekranu
type RanksScreenRouteProp = RouteProp<ParamListBase, 'Ranks'>;

type RanksScreenProps = {
  route: RanksScreenRouteProp;
};

// Typ dla pojedynczego stopnia
type Rank = {
  rank_id: string;
  rank_name: string;
  date: string; // Data w formacie ISO
};

const RanksScreen: React.FC<RanksScreenProps> = ({ route }) => {
  const { id } = route.params as { id: string };
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Funkcja pobierająca dane z API
    const fetchRanks = async () => {
      try {
        const response = await fetch(`${config.API_URL}/scouts/${id}/ranks`);
        const data: Rank[] = await response.json();

        const processedData = data.map((item) => ({
          ...item,
          date: item.date.split('T')[0], // Usunięcie czasu, pozostaje tylko część daty
        }));
    
        setRanks(processedData);
      } catch (error) {
        console.error('Błąd podczas pobierania stopni:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanks();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Ładowanie stopni...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopnie harcerki</Text>
      <FlatList
  data={ranks}
  keyExtractor={(item) => item.rank_id.toString()} // Konwertujemy ID na string
  renderItem={({ item }) => (
    <View style={styles.rankItem}>
      <Text style={styles.rankName}>{item.rank_name}</Text>
      <Text style={styles.rankDate}>
        Zdobyto: {new Intl.DateTimeFormat('pl-PL').format(new Date(item.date))}
      </Text>
    </View>
  )}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.primary,
  },
  rankItem: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rankName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rankDate: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RanksScreen;
