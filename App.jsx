import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SBar from './pages/SBar';
import Main from './pages/main/Main';
import Theme from './src/theme';

const App = () => {
  const [appTheme, setAppTheme] = useState(Theme.light);
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaView style={{backgroundColor: appTheme.backgroundColor}}>
      <SBar appTheme={appTheme} />
      <Main appTheme={appTheme} setAppTheme={setAppTheme} />
    </SafeAreaView>
  );
};

export default App;
