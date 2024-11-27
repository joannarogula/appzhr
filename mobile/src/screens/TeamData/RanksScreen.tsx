import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import config from '../../config';
import {ButtonProps, Colors, FontSizes} from '../../theme';
// import styles from '../../theme'
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

type RanksScreenRouteProp = RouteProp<ParamListBase, 'Ranks'>;
type RanksScreenNavigationProp = StackNavigationProp<ParamListBase, 'Ranks'>;

type RanksScreenProps = {
  route: RanksScreenRouteProp;
  navigation: RanksScreenNavigationProp; // Dodajemy navigation
};

// Typ dla pojedynczego stopnia
type Rank = {
  rankScoutId: string;
  rank_id: string;
  rank_name: string;
  date: string; // Data w formacie ISO
};

const RanksScreen: React.FC<RanksScreenProps> = ({route, navigation}) => {
  const {id} = route.params as {id: string};
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Funkcja pobierająca dane z API
    const fetchRanks = async () => {
      try {
        const response = await fetch(`${config.API_URL}/scouts/${id}/ranks`);
        // const data: Rank[] = await response.json();
        const text = await response.text(); // Pobieramy odpowiedź jako tekst
        // console.log(text);

        if (!text) {
          console.log('Brak danych w odpowiedzi serwera.');
          setRanks([]); // Ustaw pustą listę, jeśli brak danych
          return;
        }

        const data: Rank[] = JSON.parse(text); // Parsujemy odpowiedź tylko jeśli istnieje

        const processedData = data.map(item => ({
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
  }, [ranks]);

   const removeItem = async (rankScoutId: string) => {
    try {
      // Wywołanie DELETE na API
      const response = await fetch(`${config.API_URL}/ranks/${rankScoutId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        console.error('Nie udało się usunąć stopnia. Kod odpowiedzi:', response.status);
        return;
      }
  
      // Aktualizujemy stan lokalny po pomyślnym usunięciu
      setRanks((prevRanks) => prevRanks.filter((item) => item.rankScoutId !== rankScoutId));
    } catch (error) {
      console.error('Błąd podczas usuwania stopnia:', error);
    }
  };
  
  const renderRightActions = (rankScoutId: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeItem(rankScoutId)}
    >
      <Text style={styles.deleteButtonText}>Usuń</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Rank }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.rankScoutId)}
    >
      <View style={styles.rankItem}>
        <Text style={styles.rankName}>{item.rank_name}</Text>
        <Text style={styles.rankDate}>
          Zdobyto: {new Intl.DateTimeFormat('pl-PL').format(new Date(item.date))}
        </Text>
      </View>
    </Swipeable>
  );


  

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
      {ranks.length === 0 ? (
        <>
          <Text>Brak stopni dla danej harcerki</Text>
        </>
      ) : (
        <>
        <FlatList
          data={ranks}
          keyExtractor={(item) => item.rank_id.toString()}
          renderItem={renderItem}
        />
          {/* <FlatList
            data={ranks}
            keyExtractor={item => item.rank_id.toString()}
            renderItem={({item}) => (
              <View style={styles.rankItem}>
                <Text style={styles.rankName}>{item.rank_name}</Text>
                <Text style={styles.rankDate}>
                  Zdobyto:{' '}
                  {new Intl.DateTimeFormat('pl-PL').format(new Date(item.date))}
                </Text>
              </View>
            )}
          /> */}
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRankScreen', {id: id})}>
        <Text style={styles.buttonText}>Dodaj stopień</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Wróć</Text>
      </TouchableOpacity>
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
    height: 80,
  },
  deleteButton: {
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: '89%',
    width: 80,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: Colors.red,
    padding: ButtonProps.padding,
    borderRadius: ButtonProps.borderRadius,
    marginTop: ButtonProps.marginTop,
  },
  addButton: {
    backgroundColor: Colors.secondary,
    padding: ButtonProps.padding,
    borderRadius: ButtonProps.borderRadius,
    marginTop: ButtonProps.marginTop,
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
  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.button,
    textAlign: 'center',
  },
});

export default RanksScreen;
