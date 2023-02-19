import {Text, View, RefreshControl} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, SectionList} from 'react-native';
import {Divider, Button} from '@rneui/themed';
import Fetch from './fetch';
import Theme from '../../../src/theme';
import Toast from 'react-native-root-toast';
import CONSTANT from '../../../src/constant';

const titleECO = '经济指数';
const titleCPO = '加密指数';
const ECO_INDEX = 0;
const CPO_INDEX = 1;

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
      [titleECO, titleCPO].forEach(title => {
        dataList.push({
          title: title,
          data: [],
        });
      });
    }
    try {
      dataList.forEach(item => {
        item.data.splice(0, item.data.length);
      });

      const errors = [];
      await Fetch.ECO(items => {
        dataList[ECO_INDEX].data = items;
      }, errors);

      setDataList([...dataList]);
      if (props.currentIndex === CONSTANT.DATA_INDEX) {
        if (errors.length > 0) {
          let errstr = '';
          errors.forEach(e => {
            errstr += e.toString();
            errstr += '\n';
          });
          errstr.trim();
          Toast.show(`刷新失败!\n原因: ${errstr}`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: appTheme.floatBGColor,
            textColor: Theme.constant.failedColor,
            shadow: false,
          });
        } else {
          Toast.show('刷新成功!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: appTheme.floatBGColor,
            textColor: Theme.constant.succeedColor,
            shadow: false,
          });
        }
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
                width: '60%',
                color: !!item.color ? item.color : appTheme.fontColor,
                fontSize: appTheme.fontSize,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                width: '20%',
                color: !!item.color ? item.color : appTheme.fontColor,
                fontSize: appTheme.fontSize,
              }}>
              {item.value}
            </Text>
            <Text
              style={{
                width: '20%',
                color: !!item.color ? item.color : appTheme.fontColor,
                fontSize: appTheme.fontSize,
              }}>
              {item.rate}
            </Text>
          </View>
        )}
      />
      <View style={{display: 'none'}}>
        <Button
          onPress={async () => {
            await Fetch.ECO(items => {
              dataList[ECO_INDEX].data = items;
              setDataList([...dataList]);
            });
            // console.log(dataList[ECO_INDEX].data)
          }}>
          Fetch
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Data;
