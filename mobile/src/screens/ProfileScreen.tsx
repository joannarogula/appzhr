import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserId } from '../asyncStorage';
import config from '../config';
import { Colors, Spacing } from '../theme';

// const ProfileScreen: React.FC = ({navigation}: any) => {
const ProfileScreen = ({navigation}: {navigation: any}) => 
// function ProfileScreen(props: {navigation: any;
 {
  // const navigation = props;
  const [userData, setUserData] = useState<{
    email: string;
    team_name: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    // Zresetuj dane użytkownika
    setUserData({
      email: '',
      team_name: '',
      role: ''
    });

    // Opcjonalnie: Możesz także wyczyścić inne dane, jak tokeny autoryzacyjne lub sesje
    // np. AsyncStorage.clear() jeśli używasz AsyncStorage do przechowywania tokenów

    // Przekierowanie do ekranu logowania
    // navigation.navigate('Logowanie'); // Zmieniamy nazwę ekranu na odpowiednią w twojej aplikacji
    navigation.pop(2)
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserId(); // Pobierz userId
        if (!userId) {
          throw new Error('Nie znaleziono userId w AsyncStorage');
        }
        

        const response = await fetch(`${config.API_URL}/users/${userId}`); // Przykładowy API
        
        if (!response.ok) {
          console.log("not good");
          throw new Error('Błąd podczas pobierania danych użytkownika');
        }

        const data = await response.json();
        setUserData(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error); // Obsługujemy błąd
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);



  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Ładowanie...</Text>
      </View>
    );
  }


  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nie udało się załadować danych użytkownika.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/user.png')} 
        style={styles.profileImage} 
      />
      <Text style={styles.title}>Profil użytkownika</Text>
<Text style={styles.info}>
  <Text style={styles.label}>E-mail: </Text>
  {userData.email}
</Text>
<Text style={styles.info}>
  <Text style={styles.label}>Nazwa drużyny: </Text>
  {userData.team_name}
</Text>
<Text style={styles.info}>
  <Text style={styles.label}>Rola: </Text>
  {userData.role}
</Text>


      <TouchableOpacity style={styles.changePasswordButton} onPress={() => {
    navigation.navigate('ChangePasswordScreen'); }}>
        <Text style={styles.addButtonText}>Zmień hasło</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
          // onPress={() => navigation.pop(2)}>
            onPress={logout}>
        <Text style={styles.addButtonText}>Wyloguj się</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: Colors.primary,
  },
  info: {
    fontSize: 18,
    marginVertical: 4,
    color: '#495057',
  },
  backButton: {
    backgroundColor: Colors.red,
    padding: Spacing.small,
    borderRadius: 8,
    marginTop: 12,
    width: 120,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 8,
    color: '#6c757d',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  profileImage: {
    width: 150,
    height: 150, 
    marginBottom: 20,
  },
  changePasswordButton: {
    backgroundColor: Colors.secondary, // Dodatkowy styl dla przycisku "Zmień hasło"
    padding: Spacing.small,
    borderRadius: 8,
    marginTop: 12,
    width: 120,
  },
  label: {
    fontWeight: 'bold', // Pogrubiony tekst
    color: '#000', // Możesz zmienić kolor, jeśli chcesz
  },
});

export default ProfileScreen;
