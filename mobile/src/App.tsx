import 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Colors, FontSizes, Spacing } from './theme';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import config from './config';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function getHarcerki(setData: React.Dispatch<React.SetStateAction<never[]>>) {
//   useEffect(()=> {
//     fetch('localhost:3000/api/harcerki')
//     .then(res => res.json())
//     .then(data => setData(data))
//   }, [])
// }

const getHarcerki = async (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    config;
    const response = await fetch(`${config.API_URL}/harcerki`);
    const data = await response.json();

    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



const App = () => {
  return <AppNavigator />;
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  header: {
    marginBottom: 10,
    color: Colors.primary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    backgroundColor: '#e9ecef',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default App;
