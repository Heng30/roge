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
    floatBGColor: 'white',
    fontSize: 14,
  },
  dark: {
    mode: 'dark',
    backgroundColor: Colors.darker,
    markCircleColor: 'gray',
    barStyle: 'light-content',
    dividerColor: 'gray',
    iconColor: Colors.lighter,
    fontColor: Colors.lighter,
    floatBGColor: 'black',
    fontSize: 14,
  },
  constant: {
    upColor: 'green',
    downColor: 'red',
    succeedColor: 'green',
    failedColor: 'red',
    padding: 8,
  },
  mode: 'light',
};
