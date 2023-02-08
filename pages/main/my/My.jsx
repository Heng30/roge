import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import {Icon} from '@rneui/themed';
import Theme from '../../../src/theme';

const My = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      <View
        style={{
          flexDirection: 'row',
          height: Theme.constant.headerHeight,
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={styles.headerItem}>
          <TouchableOpacity onPress={() => {}}>
            <Icon type="ionicon" name="menu" color={props.appTheme.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={[styles.headerItem]}>
          <TouchableOpacity
            onPress={() => {
              if (Theme.mode === 'light') {
                props.setAppTheme(Theme.dark);
                Theme.mode = 'dark';
              } else {
                props.setAppTheme(Theme.light);
                Theme.mode = 'light';
              }
            }}>
            <Icon
              type="ionicon"
              name={
                props.appTheme.mode === 'light'
                  ? 'sunny-outline'
                  : 'moon-outline'
              }
              color={props.appTheme.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => {}}>
            <Icon
              type="ionicon"
              name="notifications-outline"
              color={props.appTheme.iconColor}
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
export default My;
