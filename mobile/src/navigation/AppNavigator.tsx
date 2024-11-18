import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import { Alert } from 'react-native';
// import handleLogin from '../screens/Login/handleLogin';



const Stack = createStackNavigator();

function AppNavigator() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={LoginScreen}
        />
        {/* <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen> */}
        {/* Dodaj inne ekrany, np. Home */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
