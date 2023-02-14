import {StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icon} from '@rneui/themed';
import Theme from '../../../src/theme';

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
                setAppTheme(Theme.dark);
                Theme.mode = 'dark';
              } else {
                setAppTheme(Theme.light);
                Theme.mode = 'light';
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
