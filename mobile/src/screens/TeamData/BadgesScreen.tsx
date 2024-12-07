import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import config from '../../config';
import {ButtonProps, Colors, FontSizes} from '../../theme';
// import styles from '../../theme'
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

type BadgesScreenRouteProp = RouteProp<ParamListBase, 'Badges'>;
type BadgesScreenNavigationProp = StackNavigationProp<ParamListBase, 'Badges'>;

type BadgesScreenProps = {
  route: BadgesScreenRouteProp;
  navigation: BadgesScreenNavigationProp; // Dodajemy navigation
};


type Badge = {
  badgeScoutId: string;
  badge_id: string;
  badge_name: string;
  date: string; // Data w formacie ISO
};

const BadgesScreen: React.FC<BadgesScreenProps> = ({route, navigation}) => {
  const {id} = route.params as {id: string};
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Funkcja pobierająca dane z API
    const fetchBadges = async () => {
      try {
        const response = await fetch(`${config.API_URL}/scouts/${id}/badges`);
        
        const text = await response.text(); // Pobieramy odpowiedź jako tekst

        if (!text) {
          console.log('Brak danych w odpowiedzi serwera.');
          setBadges([]); // Ustaw pustą listę, jeśli brak danych
          return;
        }

        const data: Badge[] = JSON.parse(text); // Parsujemy odpowiedź tylko jeśli istnieje

        const processedData = data.map(item => ({
          ...item,
          date: item.date.split('T')[0], // Usunięcie czasu, pozostaje tylko część daty
        }));

        setBadges(processedData);
      } catch (error) {
        console.error('Błąd podczas pobierania sprawności:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [badges]);

   const removeItem = async (badgeScoutId: string) => {
    try {
      // Wywołanie DELETE na API
      const response = await fetch(`${config.API_URL}/badges/${badgeScoutId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        console.error('Nie udało się usunąć sprawności. Kod odpowiedzi:', response.status);
        return;
      }
  
      // Aktualizujemy stan lokalny po pomyślnym usunięciu
      setBadges((prevBadges) => prevBadges.filter((item) => item.badgeScoutId !== badgeScoutId));
    } catch (error) {
      console.error('Błąd podczas usuwania sprawności:', error);
    }
  };
  
  const renderRightActions = (badgeScoutId: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeItem(badgeScoutId)}
    >
      <Text style={styles.deleteButtonText}>Usuń</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Badge }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.badgeScoutId)}
    >
      <View style={styles.badgeItem}>
        <Text style={styles.badgeName}>{item.badge_name}</Text>
        <Text style={styles.badgeDate}>
          Zdobyto: {new Intl.DateTimeFormat('pl-PL').format(new Date(item.date))}
        </Text>
      </View>
    </Swipeable>
  );


  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Ładowanie sprawności...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sprawności osoby</Text>
      {badges.length === 0 ? (
        <>
          <Text>Brak sprawności dla danej osoby</Text>
        </>
      ) : (
        <>
        <FlatList
          data={badges}
          keyExtractor={(item) => item.badge_id.toString()}
          renderItem={renderItem}
        />
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBadgeScreen', {id: id})}>
        <Text style={styles.buttonText}>Dodaj sprawność</Text>
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
  badgeItem: {
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
  badgeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeDate: {
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

export default BadgesScreen;
