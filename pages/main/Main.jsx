import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Divider} from '@rneui/themed';
import React, {useState} from 'react';
import Theme from './../../src/theme';
import Recent from './recent/Recent';
import Data from './data/Data';
import News from './news/News';
import My from './my/My';
import CONSTANT from './../../src/constant';

const RECENT_INDEX = CONSTANT.RECENT_INDEX;
const DATA_INDEX = CONSTANT.DATA_INDEX;
const NEWS_INDEX = CONSTANT.NEWS_INDEX;
const ME_INDEX = CONSTANT.ME_INDEX;
const DOUBLE_CLICK_INTERVAL = CONSTANT.DOUBLE_CLICK_INTERVAL;

const Main = props => {
  const appTheme = props.appTheme;
  // const [index, setIndex] = useState(RECENT_INDEX);
  // const [index, setIndex] = useState(NEWS_INDEX);
  // const [index, setIndex] = useState(ME_INDEX);
  const [index, setIndex] = useState(DATA_INDEX);
  const [isBullMarket, setIsBullMarket] = useState(false);
  const [btnClickTime] = useState([null, null, null, null]);
  const [isDoubleClickRecentBtn, setIsDoubleClickRecentBtn] = useState(false);
  const [isDoubleClickDataBtn, setIsDoubleClickDataBtn] = useState(false);
  const [isDoubleClickNewsBtn, setIsDoubleClickNewsBtn] = useState(false);
  const [isJump2Recent, setIsJump2Recent] = useState(false);
  const [isJump2News, setIsJump2News] = useState(false);

  return (
    <View style={{height: '100%'}}>
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, display: index === RECENT_INDEX ? 'flex' : 'none'}}>
          <Recent
            setIsBullMarket={setIsBullMarket}
            appTheme={appTheme}
            isDoubleClickRecentBtn={isDoubleClickRecentBtn}
            isJump2Recent={isJump2Recent}
            currentIndex={index}
          />
        </View>
        <View
          style={{flex: 1, display: index === DATA_INDEX ? 'flex' : 'none'}}>
          <Data
            setIsBullMarket={setIsBullMarket}
            appTheme={appTheme}
            isDoubleClickDataBtn={isDoubleClickDataBtn}
            currentIndex={index}
          />
        </View>
        <View
          style={{flex: 1, display: index === NEWS_INDEX ? 'flex' : 'none'}}>
          <News
            appTheme={appTheme}
            isDoubleClickNewsBtn={isDoubleClickNewsBtn}
            isJump2News={isJump2News}
            currentIndex={index}
          />
        </View>
        <View style={{flex: 1, display: index === ME_INDEX ? 'flex' : 'none'}}>
          <My
            screenProps={{
              appTheme: appTheme,
              setAppTheme: props.setAppTheme,
            }}
          />
        </View>
      </View>

      <Divider color={appTheme.dividerColor} />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.TOContainer}
          onPress={() => {
            const date = new Date();
            if (btnClickTime[RECENT_INDEX]) {
              if (date - btnClickTime[RECENT_INDEX] <= DOUBLE_CLICK_INTERVAL) {
                setIsDoubleClickRecentBtn(a => !a);
              }
            }
            btnClickTime[RECENT_INDEX] = date;

            if (index !== RECENT_INDEX) setIsJump2Recent(a => !a);
            setIndex(RECENT_INDEX);
          }}>
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
              fontSize: appTheme.fontSize - 3,
            }}>
            行情
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TOContainer}
          onPress={() => {
            const date = new Date();
            if (btnClickTime[DATA_INDEX]) {
              if (date - btnClickTime[DATA_INDEX] <= DOUBLE_CLICK_INTERVAL) {
                setIsDoubleClickDataBtn(a => !a);
              }
            }
            btnClickTime[DATA_INDEX] = date;
            setIndex(DATA_INDEX);
          }}>
          <Icon
            name="md-pulse-outline"
            type="ionicon"
            color={
              index === DATA_INDEX
                ? isBullMarket
                  ? Theme.constant.upColor
                  : Theme.constant.downColor
                : 'gray'
            }
          />

          <Text
            style={{
              color:
                index === DATA_INDEX
                  ? isBullMarket
                    ? Theme.constant.upColor
                    : Theme.constant.downColor
                  : 'gray',
              fontSize: appTheme.fontSize - 3,
            }}>
            指数
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TOContainer}
          onPress={() => {
            const date = new Date();
            if (btnClickTime[NEWS_INDEX]) {
              if (date - btnClickTime[NEWS_INDEX] <= DOUBLE_CLICK_INTERVAL) {
                setIsDoubleClickNewsBtn(a => !a);
              }
            }
            btnClickTime[NEWS_INDEX] = date;

            if (index !== NEWS_INDEX) setIsJump2News(a => !a);
            setIndex(NEWS_INDEX);
          }}>
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
              fontSize: appTheme.fontSize - 3,
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
              fontSize: appTheme.fontSize - 3,
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
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
