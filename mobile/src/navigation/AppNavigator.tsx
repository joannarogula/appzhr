import 'react-native-reanimated';
import React, {useContext} from 'react';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import handleLogin from '../screens/Login/handleLogin';
import RegisterScreen from '../screens/Register/RegisterScreen';
import TeamDataScreen from '../screens/TeamData/TeamDataScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Entypo';
import {Colors, FontSizes, Spacing} from '../theme';
import {UserContext, UserProvider} from '../context/UserContext';
import AddPatrol from '../screens/TeamData/AddPatrol';
import AddScout from '../screens/TeamData/AddScout';
import RanksScreen from '../screens/TeamData/RanksScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const AddStackNav = () => {
//   return (
//     <Stack.Navigator initialRouteName="Dane" screenOptions={({navigation}) => ({
//       headerShown: false,
//       headerLeft: () => (
//         <Icon
//           name="menu"
//           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//           size={30}
//           color={Colors.secondary}
//         />
//       ),
//       drawerActiveTintColor: Colors.secondary,
//     })}>
//       <Stack.Screen name="Dane" component={TeamDataScreen}  />
//       <Stack.Screen name="AddPatrol" component={AddPatrol} />
//        <Stack.Screen name="AddHarcerka" component={AddScout} />
//       </Stack.Navigator>
//   );
// };

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Strona Główna">
      <Drawer.Screen name="Strona Główna" component={HomeScreen} />
      <Drawer.Screen name="Moja Drużyna" component={TeamDataScreen} />
      <Drawer.Screen name="Mój Profil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

// type RootStackParamList = {
//   Ranks: { id: string };
//   OtherScreen: undefined;
// };

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Logowanie"
        screenOptions={({navigation}) => ({
          headerShown: false,
          headerLeft: () => (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={30}
              color={Colors.secondary}
            />
          ),
          drawerActiveTintColor: Colors.secondary,
        })}>
        <Stack.Screen name="Logowanie">
          {props => (
            <LoginScreen
              {...props}
              onLogin={async (email, password) => {
                const success = await handleLogin(email, password);
                if (success) {
                  props.navigation.navigate('Drawer');
                }
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Drawer"
          component={DrawerNav}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddPatrol" component={AddPatrol} />
        <Stack.Screen name="AddScout" component={AddScout} />
        <Stack.Screen name="Ranks" component={RanksScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
