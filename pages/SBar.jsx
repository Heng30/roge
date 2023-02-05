import {StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SBar = () => {
    const isDarkMode = false;
    return (
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        />
    );
};

export default SBar;
