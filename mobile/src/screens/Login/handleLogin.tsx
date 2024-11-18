// import { Alert } from 'react-native';


// const handleLogin = async (email: string, password: string) => {
//     try {
//       const response = await fetch('http://192.168.1.133:3000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         Alert.alert('Sukces', `Zalogowano jako: ${email}`);
//         // Tutaj dodaj nawigację do głównego ekranu
//       } else {
//         Alert.alert('Błąd', data.message || 'Logowanie nie powiodło się.');
//       }
//     } catch (error) {
//       Alert.alert('Błąd', 'Wystąpił problem z połączeniem.');
//     }
//   };
  
//   export default handleLogin;