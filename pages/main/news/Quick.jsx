import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import Theme from '../../../src/theme';
import util from '../../../src/util';
import CONSTANT from '../../../src/constant';

const Quick = props => {
  const flatListRef = useRef(null);
  const appTheme = props.appTheme;
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    if (dataList.length > 0) flatListRef.current.scrollToIndex({index: 0});
  }, [props.isDoubleClickNewsBtn]);

  const upFechData = async () => {
    try {
      const url = 'https://api.theblockbeats.info/v29/newsflash/select?page=1';
      const resp = await axios.get(url);

      if (resp.data.code !== 200) return;
      const rlist = resp.data.data.data;
      console.log(rlist.length);
      if (rlist.length <= 0) return;

      dataList.splice(0, dataList.length);
      rlist.forEach(item => {
        dataList.push({
          id: item.id,
          title: item.title,
          content: item.content,
          addTime: item.add_time,
          url: item.url,
        });
      });

      setPageIndex(2);
      setDataList([...dataList]);

      if (props.currentIndex === CONSTANT.NEWS_INDEX) {
        Toast.show('刷新成功!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          backgroundColor: appTheme.floatBGColor,
          textColor: Theme.constant.succeedColor,
          shadow: false,
        });
      }
    } catch (e) {
      if (props.currentIndex === CONSTANT.NEWS_INDEX) {
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

  const downFechData = async () => {
    try {
      const url =
        'https://api.theblockbeats.info/v29/newsflash/select?page=' + pageIndex;
      const resp = await axios.get(url);

      if (resp.data.code !== 200) return;
      const rlist = resp.data.data.data;
      console.log(rlist.length);
      if (rlist.length <= 0) return;

      rlist.forEach(item => {
        if (dataList.findIndex(a => a.id === item.id) >= 0) return;
        dataList.push({
          id: item.id,
          title: item.title,
          content: item.content,
          addTime: item.add_time,
          url: item.url,
        });
      });

      setPageIndex(a => a + 1);
      setDataList([...dataList]);
    } catch (e) {
      if (props.currentIndex === CONSTANT.NEWS_INDEX) {
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
      await upFechData();
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, paddingTop: Theme.constant.padding}}>
      <FlatList
        style={{flex: 1}}
        ref={flatListRef}
        data={dataList}
        extraData={dataList}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          await downFechData();
        }}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={appTheme.floatBGColor}
            colors={[appTheme.fontColor]}
            refreshing={isLoading}
            onRefresh={async () => {
              setIsLoading(true);
              await upFechData();
              setIsLoading(false);
            }}
          />
        }
        renderItem={({item}) => (
          <View
            style={{
              paddingHorizontal: Theme.constant.padding * 1.5,
              paddingBottom: Theme.constant.padding * 2,
            }}>
            <Text
              style={{
                fontSize: appTheme.fontSize + 2,
                paddingBottom: Theme.constant.padding,
                color: appTheme.fontColor,
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: appTheme.fontSize,
                color: appTheme.fontColor,
              }}>
              {item.content}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: appTheme.fontSize - 3,
                  color: appTheme.fontColor,
                }}>
                {util.toDateString(item.addTime * 1000, true)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const url = String(item.url);
                  if (url.startsWith('http') && Linking.canOpenURL(url))
                    Linking.openURL(url);
                  else {
                    Toast.show('无法访问!', {
                      duration: Toast.durations.SHORT,
                      position: Toast.positions.TOP,
                      backgroundColor: appTheme.floatBGColor,
                      textColor: Theme.constant.failedColor,
                      shadow: false,
                    });
                  }
                }}>
                <Text
                  style={{
                    fontSize: appTheme.fontSize - 3,
                    color: appTheme.fontColor,
                    paddingHorizontal: Theme.constant.padding,
                  }}>
                  「阅读原文」
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Quick;
