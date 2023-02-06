import {StyleSheet, View} from 'react-native';
import {Tab, Divider} from '@rneui/themed';
import React, {useState} from 'react';

import Recent from './recent/Recent';
import My from './My';

const Main = () => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, display: index === 0 ? 'flex' : 'none'}}>
          <Recent />
        </View>
        <View style={{flex: 1, display: index === 1 ? 'flex' : 'none'}}>
          <My />
        </View>
      </View>

      <Divider color="lightgray" />

      <Tab
        value={index}
        onChange={e => setIndex(e)}
        buttonStyle={_active => ({
          backgroundColor: 'white',
          height: 45,
        })}
        disableIndicator
        variant="primary">
        <Tab.Item
          title="行情"
          titleStyle={
            index === 0 ? styles.tabTitleActive : styles.tabTitleInactive
          }
          icon={{
            name: 'timer-outline',
            type: 'ionicon',
            color: index === 0 ? styles.tabTitleActive.color : styles.tabTitleInactive.color,
          }}
        />

        <Tab.Item
          title="我的"
          titleStyle={
            index === 1 ? styles.tabTitleActive : styles.tabTitleInactive
          }
          icon={{
            name: 'person-outline',
            type: 'ionicon',
            color: index === 1 ? styles.tabTitleActive.color : styles.tabTitleInactive.color,
          }}
        />
      </Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: '100%',
  },

  tabTitleActive: {
    fontSize: 12,
    color: 'red',
  },
  tabTitleInactive: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Main;
