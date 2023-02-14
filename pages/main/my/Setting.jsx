import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';
import Theme from '../../../src/theme';

const SettingScreen = props => {
  const appTheme = props.screenProps.appTheme;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: Theme.constant.padding,
        }}>
        <View style={styles.headerItem}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Home');
            }}>
            <Icon type="ionicon" name="arrow-back" color={appTheme.iconColor} />
          </TouchableOpacity>
        </View>

        <View
          style={[styles.headerItem, {paddingLeft: Theme.constant.padding}]}>
          <Text
            style={{
              color: appTheme.fontColor,
              fontSize: appTheme.fontSize + 4,
              fontWeight: 'bold',
            }}>
            设置
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingScreen;
