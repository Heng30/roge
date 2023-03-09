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
      timestamp - 24 * 3600
    }&end=${timestamp + 12 * 3600}`;

    try {
      const resp = await axios.get(url);
      const data = resp.data.data.items;
      if (!data) return;
      dataList.splice(0, dataList.length);
      data.reverse();
      data.forEach(item => {
        const importance = Number(item.importance);
        if (importance < 2) return;

        let value =
          '今值: ' + (item.actual ? item.actual : '-') + util.paddingSpaces(4);
        value +=
          '预期: ' +
          (item.forecast ? item.forecast : '-') +
          util.paddingSpaces(4);
        value += '前值: ' + (item.previous ? item.previous : '-');

        dataList.push({
          id: item.id,
          time: util.toDateString(Number(item.public_date) * 1000, 0),
          country: item.country,
          title: item.title,
          value: value,
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
              padding: Theme.constant.padding,
            }}>
            <Text
              style={{
                color: item.color,
                fontSize: appTheme.fontSize + 1,
                fontWeight: 'bold',
              }}>
              {`${item.country}${item.title}`}
            </Text>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 1,
                  color: item.color,
                  fontSize: appTheme.fontSize,
                }}>
                {item.value}
              </Text>
              <Text
                style={{
                  width: '20%',
                  color: item.color,
                  fontSize: appTheme.fontSize - 2,
                  textAlign: 'right',
                }}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Recent;
