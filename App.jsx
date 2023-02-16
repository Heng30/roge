import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';
import SBar from './pages/SBar';
import Main from './pages/main/Main';
import Theme from './src/theme';
import DB from './src/db';

const App = () => {
  const [appTheme, setAppTheme] = useState(Theme.light);
  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    DB.settingTable.get('fontSize', fontSize => {
      Theme.light.fontSize = Number(fontSize);
      Theme.dark.fontSize = Number(fontSize);
    });
    DB.settingTable.get('themeMode', themeMode => {
      if (themeMode) {
        if (themeMode === 'light') {
          setAppTheme(Theme.light);
        } else {
          setAppTheme(Theme.dark);
        }
      }
    });
  }, []);

  return (
    <RootSiblingParent>
      <SafeAreaView style={{backgroundColor: appTheme.backgroundColor}}>
        <SBar appTheme={appTheme} />
        <Main appTheme={appTheme} setAppTheme={setAppTheme} />
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default App;
