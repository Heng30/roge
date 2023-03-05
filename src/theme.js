import {Colors} from 'react-native/Libraries/NewAppScreen';

export default {
  light: {
    mode: 'light',
    backgroundColor: Colors.lighter,
    markCircleColor: 'lightgray',
    barStyle: 'dark-content',
    dividerColor: 'lightgray',
    borderColor: 'lightgray',
    iconColor: Colors.darker,
    fontColor: Colors.darker,
    floatBGColor: 'white',
    fontSize: 15,
  },
  dark: {
    mode: 'dark',
    backgroundColor: Colors.darker,
    markCircleColor: 'gray',
    barStyle: 'light-content',
    dividerColor: 'gray',
    borderColor: 'gray',
    iconColor: Colors.lighter,
    fontColor: Colors.lighter,
    floatBGColor: 'black',
    fontSize: 15,
  },
  constant: {
    upColor: 'green',
    downColor: 'red',
    succeedColor: 'green',
    failedColor: 'red',
    padding: 8,
    borderWidth: 1,
  },
  mode: 'light',
};
