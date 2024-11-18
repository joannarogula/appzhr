import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import AppNavigator from './navigation/AppNavigator';

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
  Colors,
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

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// const App = () => {
//   return <AppNavigator />;
// };

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getHarcerki(setData);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const headers = ['id', 'imie', 'nazwisko'];

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lista Harcerek</Text>
        </View>

        <View style={styles.table}>
          {/* Nagłówki tabeli */}
          <View style={[styles.row, styles.headerRow]}>
            {headers.map(header => (
              <Text key={header} style={[styles.cell, styles.headerCell]}>
                {header.toUpperCase()}
              </Text>
            ))}
          </View>

          {/* Dane tabeli */}
          {data.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {headers.map(header => (
                <Text key={header} style={styles.cell}>
                  {item[header]}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  header: {
    marginBottom: 10,
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
