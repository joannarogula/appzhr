import 'react-native-reanimated';
import React from 'react';
import {
  NavigationContainer,
  DrawerActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import TeamDataScreen from '../screens/TeamData/TeamDataScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Entypo';
import {Colors} from '../theme';
import AddPatrolScreen from '../screens/TeamData/AddPatrolScreen';
import AddScoutScreen from '../screens/TeamData/AddScoutScreen';
import RanksScreen from '../screens/TeamData/RanksScreen';
import AddRankScreen from '../screens/TeamData/AddRankScreen';
import BadgesScreen from '../screens/TeamData/BadgesScreen';
import AddBadgeScreen from '../screens/TeamData/AddBadgeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        {/* <Stack.Screen name="Logowanie">
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
        </Stack.Screen> */}
        <Stack.Screen name="Logowanie" component={LoginScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Drawer"
          component={DrawerNav}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddPatrol" component={AddPatrolScreen} />
        <Stack.Screen name="AddScout" component={AddScoutScreen} />
        <Stack.Screen name="Ranks" component={RanksScreen} />
        <Stack.Screen name="AddRankScreen" component={AddRankScreen} />
        <Stack.Screen name="Badges" component={BadgesScreen} />
        <Stack.Screen name="AddBadgeScreen" component={AddBadgeScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
