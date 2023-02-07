import {StatusBar} from 'react-native';

const SBar = (props) => {
    return (
        <StatusBar
            barStyle={props.appTheme.barStyle}
            backgroundColor={props.appTheme.backgroundColor}
        />
    );
};

export default SBar;
