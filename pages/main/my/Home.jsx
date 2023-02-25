import {StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icon} from '@rneui/themed';
import Theme from '../../../src/theme';
import DB from '../../../src/db';

const HomeScreen = props => {
  const appTheme = props.screenProps.appTheme;
  const setAppTheme = props.screenProps.setAppTheme;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: Theme.constant.padding,
        }}>
        <View style={styles.headerItem}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Setting');
            }}>
            <Icon type="ionicon" name="menu" color={appTheme.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={[styles.headerItem]}>
          <TouchableOpacity
            onPress={() => {
              if (Theme.mode === 'light') {
                const theme = {
                  ...Theme.dark,
                  fontSize: appTheme.fontSize,
                };
                setAppTheme(theme);
                Theme.mode = 'dark';
                DB.settingTable.update('themeMode', Theme.mode);
              } else {
                const theme = {
                  ...Theme.light,
                  fontSize: appTheme.fontSize,
                };
                setAppTheme(theme);
                Theme.mode = 'light';
                DB.settingTable.update('themeMode', Theme.mode);
              }
            }}>
            <Icon
              type="ionicon"
              name={
                appTheme.mode === 'light' ? 'sunny-outline' : 'moon-outline'
              }
              color={appTheme.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => {}}>
            <Icon
              type="ionicon"
              name="notifications-outline"
              color={appTheme.iconColor}
            />
          </TouchableOpacity>
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
export default HomeScreen;
