import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {Colors} from '../theme';
import config from '../config';
import {getNumberOfScouts} from '../api/api';
import {getTeamId} from '../asyncStorage';

const HomeScreen = () => {
  const [numberOfMembers, setNumberOfMembers] = useState<number[]>([]); 
  const [loading, setLoading] = useState(true);

  // Funkcja do pobrania liczby członków drużyny
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pobieramy teamId
        const id = await getTeamId();

        if (id) {
          // Pobieramy liczbę członków drużyny po ustawieniu teamId
          getNumberOfScouts(setNumberOfMembers, parseInt(id, 10));
        } else {
          Alert.alert('Błąd', 'teamId nie jest dostępne');
        }
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się pobrać danych o liczebności drużyny');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Wywołanie funkcji fetchData po załadowaniu komponentu
  }, []); 
  // useEffect({
    
  //   console.log(id)
  //   if (id !== null) {
  //      // Pobieramy dane o drużynie po załadowaniu komponentu
  //   }
  // }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/team.png')} // Możesz użyć URL obrazu, np. z backendu
        style={styles.profileImage} // Styl dla zdjęcia
      />
      <Text style={styles.teamInfo}>
        Liczba osób w drużynie: {numberOfMembers[0]}
      </Text>
      <Image
        source={require('../assets/patrol.png')} // Możesz użyć URL obrazu, np. z backendu
        style={styles.profileImage} // Styl dla zdjęcia
      />
      <Text style={styles.teamInfo}>
        Liczba zastępów: {numberOfMembers[1]}
      </Text>
      <Image
        source={require('../assets/badge.png')} // Możesz użyć URL obrazu, np. z backendu
        style={styles.profileImage} // Styl dla zdjęcia
      />
      <Text style={styles.teamInfo}>
        Zdobytych sprawności: {numberOfMembers[2]}
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
    backgroundColor: '#fff',
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.primary,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  teamInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 8,
    color: '#6c757d',
  },
});

export default HomeScreen;
