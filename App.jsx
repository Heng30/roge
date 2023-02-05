import {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SBar from './pages/SBar';
import Main from './pages/main/Main';

const App = () => {
    useEffect(() => {
        SplashScreen.hide();
    });

    return (
        <SafeAreaView>
            <SBar />
            <Main />
        </SafeAreaView>
    );
};

export default App;
