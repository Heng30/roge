import {StyleSheet, View} from 'react-native';
import {Tab, Divider} from '@rneui/themed';
import React, {useState} from 'react';

import Recent from './recent/Recent';
import My from './My';

const Main = props => {
  const [index, setIndex] = useState(0);
  const [isBullMarket, setIsBullMarket] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, display: index === 0 ? 'flex' : 'none'}}>
          <Recent setIsBullMarket={setIsBullMarket} appTheme={props.appTheme} />
        </View>
        <View style={{flex: 1, display: index === 1 ? 'flex' : 'none'}}>
          <My appTheme={props.appTheme} setAppTheme={props.setAppTheme}  />
        </View>
      </View>

      <Divider color={props.appTheme.dividerColor} />

      <Tab
        value={index}
        onChange={e => setIndex(e)}
        disableIndicator
        containerStyle={active => ({
          backgroundColor: 'transparent',
          height: 50,
        })}
        variant="default">
        <Tab.Item
          title="行情"
          titleStyle={{
            color: index === 0 ? (isBullMarket ? 'green' : 'red') : 'gray',
            fontSize: 12,
          }}
          icon={{
            name: 'timer-outline',
            type: 'ionicon',
            color: index === 0 ? (isBullMarket ? 'green' : 'red') : 'gray',
          }}
        />
        <Tab.Item
          title="我"
          titleStyle={{
            color: index === 1 ? (isBullMarket ? 'green' : 'red') : 'gray',
            fontSize: 12,
          }}
          icon={{
            name: 'person-outline',
            type: 'ionicon',
            color: index === 1 ? (isBullMarket ? 'green' : 'red') : 'gray',
          }}
        />
      </Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
    height: '100%',
  },
});

export default Main;
