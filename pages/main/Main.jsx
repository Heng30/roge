import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Divider} from '@rneui/themed';
import React, {useState} from 'react';
import Theme from './../../src/theme';
import Recent from './recent/Recent';
import My from './my/My';

const RECENT_INDEX = 0;
const NEWS_INDEX = 1;
const ME_INDEX = 2;

const Main = props => {
  const [index, setIndex] = useState(RECENT_INDEX);
  const [isBullMarket, setIsBullMarket] = useState(false);

  return (
    <View style={{height: '100%'}}>
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, display: index === RECENT_INDEX ? 'flex' : 'none'}}>
          <Recent setIsBullMarket={setIsBullMarket} appTheme={props.appTheme} />
        </View>
        <View style={{flex: 1, display: index === ME_INDEX ? 'flex' : 'none'}}>
          <My appTheme={props.appTheme} setAppTheme={props.setAppTheme} />
        </View>
      </View>

      <Divider color={props.appTheme.dividerColor} />

      <View style={{height: Theme.footerHeight, flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.TOContainer}
          onPress={() => setIndex(RECENT_INDEX)}>
          <Icon
            type="ionicon"
            name="timer-outline"
            color={
              index === RECENT_INDEX
                ? isBullMarket
                  ? Theme.constant.upColor
                  : Theme.constant.downColor
                : 'gray'
            }
          />
          <Text
            style={{
              color:
                index === RECENT_INDEX
                  ? isBullMarket
                    ? Theme.constant.upColor
                    : Theme.constant.downColor
                  : 'gray',
              fontSize: 12,
            }}>
            行情
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TOContainer}
          onPress={() => setIndex(NEWS_INDEX)}>
          <Icon
            name="newspaper-outline"
            type="ionicon"
            color={
              index === NEWS_INDEX
                ? isBullMarket
                  ? Theme.constant.upColor
                  : Theme.constant.downColor
                : 'gray'
            }
          />

          <Text
            style={{
              color:
                index === NEWS_INDEX
                  ? isBullMarket
                    ? Theme.constant.upColor
                    : Theme.constant.downColor
                  : 'gray',
              fontSize: 12,
            }}>
            资讯
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TOContainer}
          onPress={() => setIndex(ME_INDEX)}>
          <Icon
            name="person-outline"
            type="ionicon"
            color={
              index === ME_INDEX
                ? isBullMarket
                  ? Theme.constant.upColor
                  : Theme.constant.downColor
                : 'gray'
            }
          />

          <Text
            style={{
              color:
                index === ME_INDEX
                  ? isBullMarket
                    ? Theme.constant.upColor
                    : Theme.constant.downColor
                  : 'gray',
              fontSize: 12,
            }}>
            我
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TOContainer: {
    width: '33.3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
