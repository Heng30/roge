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
          height: Theme.constant.headerHeight,
          marginHorizontal: 10,
        }}>
        <View style={styles.headerItem}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Home');
            }}>
            <Icon type="ionicon" name="arrow-back" color={appTheme.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={[styles.headerItem, {marginLeft: 10}]}>
          <Text style={{color: appTheme.fontColor, fontSize: 18}}>设置</Text>
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
