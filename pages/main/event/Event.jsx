import {Text, View, RefreshControl} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Divider} from '@rneui/themed';
import axios from 'axios';
import util from '../../../src/util';
import Theme from '../../../src/theme';
import Toast from 'react-native-root-toast';
import CONSTANT from '../../../src/constant';

const Recent = props => {
  const appTheme = props.appTheme;
  const flatListRef = useRef(null);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dataList.length > 0) flatListRef.current.scrollToIndex({index: 0});
  }, [props.isDoubleClickEventBtn]);

  const fetchData = async () => {
    const timestamp = Math.round(Date.now() / 1000);
    const url = `https://api-one-wscn.awtmt.com/apiv1/finance/macrodatas?start=${
      timestamp - 48 * 3600
    }&end=${timestamp + 48 * 3600}`;

    try {
      const resp = await axios.get(url);
      const data = resp.data.data.items;
      if (!data) return;
      dataList.splice(0, dataList.length);
      data.reverse();
      data.forEach(item => {
        const importance = Number(item.importance);
        if (importance < 2) return;

        const unit = item.unit ? item.unit : '';
        const value = `${item.actual}${unit}/${item.forecast}${unit}/${item.previous}${unit}`;

        dataList.push({
          id: item.id,
          time: util.toDateString(Number(item.public_date) * 1000, false),
          country: item.country,
          title: item.title,
          value: value === '//' ? '' : value,
          color:
            importance < 3 ? Theme.constant.upColor : Theme.constant.downColor,
        });
      });
      setDataList([...dataList]);
      if (props.currentIndex === CONSTANT.EVENT_INDEX) {
        Toast.show('刷新成功!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: appTheme.floatBGColor,
          textColor: Theme.constant.succeedColor,
          shadow: false,
        });
      }
    } catch (e) {
      if (props.currentIndex === CONSTANT.EVENT_INDEX) {
        Toast.show(`刷新失败!\n原因: ${e.toString()}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: appTheme.floatBGColor,
          textColor: Theme.constant.failedColor,
          shadow: false,
        });
      }
    }
  };

  useEffect(() => {
    setImmediate(async () => {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: Theme.constant.padding,
        }}>
        <Text
          style={{
            width: '20%',
            color: Theme.constant.upColor,
            textAlign: 'center',
            fontSize: appTheme.fontSize,
          }}>
          时间
        </Text>
        <Text
          style={{
            width: '45%',
            color: Theme.constant.upColor,
            textAlign: 'center',
            fontSize: appTheme.fontSize,
          }}>
          事件
        </Text>
        <Text
          style={{
            width: '35%',
            color: Theme.constant.upColor,
            textAlign: 'center',
            fontSize: appTheme.fontSize,
          }}>
          今值/预期/前值
        </Text>
      </View>
      <Divider color={appTheme.dividerColor} />
      <FlatList
        ref={flatListRef}
        data={dataList}
        extraData={dataList}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={appTheme.floatBGColor}
            colors={[appTheme.fontColor]}
            refreshing={isLoading}
            onRefresh={async () => {
              setIsLoading(true);
              await fetchData();
              setIsLoading(false);
            }}
          />
        }
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: Theme.constant.padding,
            }}>
            <Text
              style={{
                color: item.color,
                fontSize: appTheme.fontSize,
                width: '20%',
                textAlign: 'center',
              }}>
              {item.time}
            </Text>
            <Text
              style={{
                color: item.color,
                fontSize: appTheme.fontSize,
                width: '45%',
                textAlign: 'center',
              }}>
              {`${item.country}/${item.title}`}
            </Text>
            <Text
              style={{
                color: item.color,
                fontSize: appTheme.fontSize,
                width: '35%',
                textAlign: 'center',
              }}>
              {item.value}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Recent;
