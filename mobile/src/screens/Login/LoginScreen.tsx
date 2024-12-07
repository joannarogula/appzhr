import React, { useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, FontSizes, Spacing } from '../../theme';
import handleLogin from './handleLogin';
// import { UserContext } from '../../context/UserContext';

//  function LoginScreen(props: {
//   navigation: any;
// }) {
  const LoginScreen = ({navigation}: {navigation: any}) => {

  // const { navigation } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
 

  const checkLoginData = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
      return;
    }
    else {
     
        const success = await handleLogin(email, password);
        if (success) {
          // props.navigation.navigate('Drawer');
          navigation.navigate('Drawer');
        }
    }

  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // Możesz użyć URL obrazu, np. z backendu
        style={styles.profileImage} // Styl dla zdjęcia
      />
      <Text style={styles.title}>Zaloguj się</Text>

       <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.addButton} onPress={checkLoginData}>
        <Text style={styles.addButtonText}>Zaloguj</Text>
      </TouchableOpacity>
      

      <Text style={styles.footer}>
        Nie masz konta? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Zarejestruj się</Text>
      </Text> 
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: FontSizes.title,
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
    backgroundColor: Colors.white,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.small,
    borderRadius: 8,
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100, 
    marginBottom: 20,
  },
});

export default LoginScreen;
