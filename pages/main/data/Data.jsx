import {Text, View, RefreshControl} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, SectionList} from 'react-native';
import {Divider} from '@rneui/themed';
import Fetch from './fetch';
import Theme from '../../../src/theme';
import Toast from 'react-native-root-toast';
import CONSTANT from '../../../src/constant';

const Data = props => {
  const appTheme = props.appTheme;
  const sectionListRef = useRef(null);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (dataList.length > 0)
      sectionListRef.current.scrollToLocation({
        itemIndex: 0,
        sectionIndex: 0,
      });
  }, [props.isDoubleClickDataBtn]);

  const fetchData = async () => {
    if (dataList.length <= 0) {
      const titleECO = '经济指数';
      const dataECO = [
        '上证指数',
        '深证成指',
        '创业板指',
        '美元指数',
        '标普500 ',
        '离岸人名币',
        '美国10年期国债收益率',
      ];
      dataList.push({
        title: titleECO,
        data: dataECO.map(item => {
          return {
            name: item,
            value: 'N/A',
          };
        }),
      });

      const titleCPO = '加密指数';
      const dataCPO = [
        '加密货币总市值(美元)',
        '24小时交易量(美元)',
        '24小时BTC多空比',
        'BTC市值占比',
        '今日/昨日贪婪指数',
        '以太坊油费',
      ];

      dataList.push({
        title: titleCPO,
        data: dataCPO.map(item => {
          return {
            name: item,
            value: 'N/A',
          };
        }),
      });
    } else {
      dataList.forEach(item => {
        item.data.forEach(it => {
          it.value = 'N/A';
        });
      });
    }

    try {
      // TODO: 更新数据
      setDataList([...dataList]);
      if (props.currentIndex === CONSTANT.DATA_INDEX) {
        Toast.show('刷新成功!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: appTheme.floatBGColor,
          textColor: Theme.constant.succeedColor,
          shadow: false,
        });
      }
    } catch (e) {
      if (props.currentIndex === CONSTANT.DATA_INDEX) {
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
      <SectionList
        ref={sectionListRef}
        sections={dataList}
        extraData={dataList}
        keyExtractor={item => item.name}
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
        renderSectionHeader={({section: {title}}) => (
          <View>
            <View
              style={{
                height: Theme.constant.padding,
                width: '100%',
              }}></View>
            <Text
              style={{
                color: appTheme.fontColor,
                fontWeight: 'bold',
                fontSize: appTheme.fontSize + 2,
                padding: Theme.constant.padding,
                textAlign: 'center',
                backgroundColor: appTheme.floatBGColor,
              }}>
              {title}
            </Text>
            <Divider color={appTheme.dividerColor} />
          </View>
        )}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              padding: Theme.constant.padding,
              backgroundColor: appTheme.floatBGColor,
            }}>
            <Text
              style={{
                width: '70%',
                color: item.color ? item.color : appTheme.fontColor,
                fontSize: appTheme.fontSize,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                width: '30%',
                color: item.color ? item.color : appTheme.fontColor,
                fontSize: appTheme.fontSize,
              }}>
              {item.value}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Data;
