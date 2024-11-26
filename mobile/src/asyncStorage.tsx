import AsyncStorage from '@react-native-async-storage/async-storage';

// Funkcja zapisująca teamId i userId
export const saveTeamAndUserIds = async (teamId: number | string, userId: number | string): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      ['teamId', teamId.toString()],
      ['userId', userId.toString()]
    ]);
    console.log('Zapisano dane w Async Storage');
  } catch (e) {
    console.error('Błąd przy zapisie danych', e);
  }
};

// Funkcja pobierająca teamId
export const getTeamId = async (): Promise<string | null> => {
  try {
    const teamId = await AsyncStorage.getItem('teamId');
    // console.log('Odczytano teamId:', teamId);
    return teamId; // Zwraca string lub null
  } catch (e) {
    console.error('Błąd przy odczycie teamId', e);
    return null;
  }
};

// Funkcja pobierająca userId
export const getUserId = async (): Promise<string | null> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    // console.log('Odczytano userId:', userId);
    return userId; // Zwraca string lub null
  } catch (e) {
    console.error('Błąd przy odczycie userId', e);
    return null;
  }
};

// Funkcja usuwająca teamId i userId
export const removeTeamAndUserIds = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(['teamId', 'userId']);
    console.log('Usunięto dane z Async Storage');
  } catch (e) {
    console.error('Błąd przy usuwaniu danych', e);
  }
};
