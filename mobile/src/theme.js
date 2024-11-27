import {StyleSheet} from 'react-native';

const Colors = {
  primary: '#3c7624',
  // secondary: '#89d6ce',
  secondary: '#54a199',
  background: '#ecf0f1',
  text: '#2d353d',
  red: '#ab203a',
  white: '#ffffff',
};

const FontSizes = {
  small: 12,
  button: 16,
  medium: 16,
  large: 20,
  title: 30,
};

const Spacing = {
  small: 10,
  medium: 16,
  large: 24,
};

const ButtonProps = {
  padding: 8,
  borderRadius: 5,
  marginTop: 12,
}

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: Spacing.large,
//     backgroundColor: Colors.background,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: Spacing.medium,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     padding: Spacing.small,
//     borderRadius: 8,
//     marginBottom: Spacing.medium,
//   },
//   picker: {
//     height: 50,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     borderRadius: 8,
//   },
//   addButton: {
//     backgroundColor: Colors.primary,
//     padding: Spacing.medium,
//     borderRadius: 8,
//     marginTop: 12,
//   },
//   backButton: {
//     backgroundColor: Colors.red,
//     padding: Spacing.small,
//     borderRadius: 8,
//     marginTop: 12,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },

//   rankItem: {
//     padding: 12,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   closeButton: {
//     backgroundColor: Colors.red,
//     padding: 8,
//     borderRadius: 5,
//     marginTop: 12,
//   },
//   rankName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   rankDate: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginTop: 4,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export {Colors, FontSizes, Spacing, ButtonProps};
