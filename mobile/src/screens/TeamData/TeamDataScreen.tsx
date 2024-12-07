import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ButtonProps, Colors, FontSizes, Spacing} from '../../theme';
import {getTeamId} from '../../asyncStorage';
import {
  useFocusEffect,
} from '@react-navigation/native';
import {getPatrols, getScouts} from '../../api/api';

const TeamDataScreen = ({navigation}: {navigation: any}) => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [selectedScout, setSelectedScout] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: number;
    birthDate: string;
    joinDate: string;
  } | null>(null);
  //

  const [scouts, setScouts] = useState<any[]>([]); 
  const [patrols, setPatrols] = useState<any[]>([]);


  const [loading, setLoading] = useState<boolean>(true);


  const fetchData = async () => {
    try {
      const id = await getTeamId(); 

      if (id !== null) {
        await getScouts(setScouts, parseInt(id, 10));
        await getPatrols(setPatrols, parseInt(id, 10));
      }
    } catch (error) {
      console.error('Błąd przy ładowaniu teamId lub harcerzy', error);
    } finally {
      setLoading(false); // Kończymy ładowanie
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData(); // Pobierz dane za każdym razem, gdy ekran jest aktywny
    }, []),
  );

  const groups = patrols.map(patrol => ({
    id: patrol.id,
    name: patrol.name,
    scouts: scouts
      .filter(scout => scout.patrolId === patrol.id)
      .map(scout => ({
        ...scout, 
        birthDate: new Date(scout.birthDate).toISOString().split('T')[0], // Konwersja daty
        joinDate: new Date(scout.joinDate).toISOString().split('T')[0], // Konwersja daty
      })),
  }));

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zastępy</Text>
      <FlatList
        data={groups}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.groupContainer}>
            {/* Wyświetlanie zastępu */}
            <TouchableOpacity
              onPress={() =>
                setExpandedGroup(expandedGroup === item.id ? null : item.id)
              }
              style={styles.groupButton}>
              <Text style={styles.groupText}>{item.name}</Text>
            </TouchableOpacity>
            {/* Wyświetlanie harcerzy w rozwiniętym zastępie */}
            {expandedGroup === item.id && (
              <View style={styles.scoutsList}>
                {item.scouts.map((scout, id) => (
                  <TouchableOpacity
                    key={id}
                    onPress={() => setSelectedScout(scout)}
                    style={styles.scoutButton}>
                    <Text style={styles.scoutText}>
                      {scout.firstName} {scout.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />

      

      {selectedScout && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!selectedScout}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Dane osoby</Text>
              <Text>Imię: {selectedScout.firstName}</Text>
              <Text>Nazwisko: {selectedScout.lastName}</Text>
              <Text>Email: {selectedScout.email}</Text>
              <Text>Nr telefonu: {selectedScout.telephone}</Text>
              <Text>Data urodzenia: {selectedScout.birthDate}</Text>
              <Text>Data przyjęcia: {selectedScout.joinDate}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedScout(null); // Zamknięcie modalu
                  navigation.navigate('Ranks', {id: selectedScout.id}); // Przekierowanie do ekranu stopni
                }}
                style={styles.addButton}>
                <Text style={styles.buttonText}>STOPNIE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedScout(null); // Zamknięcie modalu
                  navigation.navigate('Badges', {id: selectedScout.id}); // Przekierowanie do ekranu stopni
                }}
                style={styles.addButton}>
                <Text style={styles.buttonText}>SPRAWNOŚCI</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedScout(null)}
                style={styles.closeButton}>
                <Text style={styles.buttonText}>ZAMKNIJ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={{marginTop: 20}}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPatrol')}>
          <Text style={styles.buttonText}>DODAJ ZASTĘP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddScout')}>
          <Text style={styles.buttonText}>DODAJ OSOBĘ</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
  },
  groupContainer: {
    marginBottom: 16,
  },
  groupButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  
  groupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoutsList: {
    marginTop: 8,
    paddingLeft: 16,
  },
  scoutButton: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scoutText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingBottom: 20,
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: Colors.red,
    padding: ButtonProps.padding,
    borderRadius: ButtonProps.borderRadius,
    marginTop: ButtonProps.marginTop,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSizes.button,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: Colors.secondary,
    padding: ButtonProps.padding,
    borderRadius: ButtonProps.borderRadius,
    marginTop: ButtonProps.marginTop,
  },
});

export default TeamDataScreen;
