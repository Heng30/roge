import {Colors} from 'react-native/Libraries/NewAppScreen';

export default {
  light: {
    mode: 'light',
    backgroundColor: Colors.lighter,
    markCircleColor: 'lightgray',
    barStyle: 'dark-content',
    dividerColor: 'lightgray',
    iconColor: Colors.darker,
    fontColor: Colors.darker,
  },
  dark: {
    mode: 'dark',
    backgroundColor: Colors.darker,
    markCircleColor: 'gray',
    barStyle: 'light-content',
    dividerColor: 'gray',
    iconColor: Colors.lighter,
    fontColor: Colors.lighter,
  },
  constant: {
    upColor: 'green',
    downColor: 'red',
    headerHeight: 40,
    footerHeight: 50,
  },
  mode: 'light',
};
