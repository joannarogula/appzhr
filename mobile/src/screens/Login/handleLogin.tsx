import {Alert} from 'react-native';
import config from '../../config';
import {saveTeamAndUserIds} from '../../asyncStorage.tsx';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${config.API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({login: email, password: password}),
    });

    const data = await response.json();

    if (response.ok) {
      // Tu pobieramy id użytkownika
      const userId = data.user?.id;
      const teamId = data.user?.teamId;
      await saveTeamAndUserIds(teamId, userId);

      Alert.alert('Sukces', `Zalogowano jako: ${email}`);
      return true;
    } else {
      Alert.alert('Błąd', data.message || 'Logowanie nie powiodło się.');
      return false;
    }
  } catch (error) {
    Alert.alert('Błąd', String(error));
    return false;
  }
};

export default handleLogin;
