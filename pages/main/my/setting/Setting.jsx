import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';
import Theme from '../../../../src/theme';
import Preference from './Preference';
import API from './API';
import Sync from './Sync';

const SettingScreen = props => {
  const appTheme = props.screenProps.appTheme;
  const setAppTheme = props.screenProps.setAppTheme;

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
      <Preference appTheme={appTheme} setAppTheme={setAppTheme} />
      <API appTheme={appTheme} />
      <Sync appTheme={appTheme} />
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
