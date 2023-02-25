import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {Icon, Divider} from '@rneui/themed';
import Theme from '../../../src/theme';
import DB from '../../../src/db';

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
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: appTheme.floatBGColor,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: appTheme.fontSize + 2,
              padding: Theme.constant.padding,
              color: appTheme.fontColor,
            }}>
            界面
          </Text>
          <Divider></Divider>
          <View
            style={{
              flexDirection: 'row',
              padding: Theme.constant.padding,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: appTheme.fontSize,
                color: appTheme.fontColor,
              }}>
              字体大小
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  const fontSize = appTheme.fontSize + 1;
                  appTheme.fontSize = fontSize;
                  setAppTheme({...appTheme});
                  DB.settingTable.update('fontSize', fontSize);
                }}>
                <Icon type="ionicon" name="add" color={appTheme.fontColor} />
              </TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: Theme.constant.padding,
                  color: appTheme.fontColor,
                }}>
                {appTheme.fontSize}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const fontSize = appTheme.fontSize - 1;
                  if (fontSize < 10) return;
                  appTheme.fontSize = fontSize;
                  setAppTheme({...appTheme});
                  DB.settingTable.update('fontSize', fontSize);
                }}>
                <Icon type="ionicon" name="remove" color={appTheme.fontColor} />
              </TouchableOpacity>
            </View>
          </View>
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
