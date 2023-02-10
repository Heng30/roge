import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Divider} from '@rneui/themed';
import axios from 'axios';
import util from '../../../src/util';
import Theme from '../../../src/theme';

const Recent = props => {
  const flatListRef = useRef(null);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upCnt, setUpCnt] = useState([0, 0, 0]);
  const [titleColor, setTitleColor] = useState(Theme.constant.downColor);
  const [markSymbolList, setMarkSymbolList] = useState([]);
  const [refreshTimestand, setRefreshTimestand] = useState(new Date());
  const [passTimestand, setPassTimestand] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSortUp, setIsSortUp] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (dataList.length > 0) flatListRef.current.scrollToIndex({index: 0});
  }, [props.isDoubleClickRecentBtn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPassTimestand(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const url = 'https://api.alternative.me/v1/ticker/?limit=100';
      const resp = await axios.get(url);
      const rlist = resp.data;
      console.log(rlist.length);
      if (rlist.length !== 100) return;

      if (dataList.length <= 0) {
        for (let i = 0; i < 100; i++) {
          dataList.push({
            index: i + 1,
          });
        }
      }

      console.log(markSymbolList);
      let ucnt = [0, 0, 0];
      dataList.forEach((item, index) => {
        item.index = index + 1;
        item.symbol = rlist[index].symbol;
        item.price = util.toFixedPrice(rlist[index].price_usd);
        item.precent1h = rlist[index].percent_change_1h;
        item.precent24h = rlist[index].percent_change_24h;
        item.precent7d = rlist[index].percent_change_7d;

        item.mark = false;
        if (markSymbolList.findIndex(s => s === item.symbol) >= 0) {
          item.mark = true;
        }

        if (Number(rlist[index].percent_change_1h) >= 0) {
          ucnt[0]++;
        }

        if (Number(rlist[index].percent_change_24h) >= 0) {
          item.color = Theme.constant.upColor;
          ucnt[1]++;
        } else {
          item.color = Theme.constant.downColor;
        }

        if (Number(rlist[index].percent_change_7d) >= 0) {
          ucnt[2]++;
        }
      });

      dataList.sort((a, b) => {
        let n = Number(b.mark) - Number(a.mark);
        if (n === 0) return a.index - b.index;
        return n;
      });

      props.setIsBullMarket(ucnt[1] >= 50);
      setRefreshTimestand(new Date());
      setTitleColor(
        ucnt[1] >= 50 ? Theme.constant.upColor : Theme.constant.downColor,
      );
      setUpCnt(ucnt);
      setDataList([...dataList]);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleMark = index => {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].index !== index) continue;
      dataList[i].mark = !dataList[i].mark;
      if (dataList[i].mark) {
        markSymbolList.push(dataList[i].symbol);
      } else {
        const mindex = markSymbolList.findIndex(s => s === dataList[i].symbol);
        if (mindex >= 0) {
          markSymbolList.splice(mindex, 1);
        }
      }
      setDataList([...dataList]);
    }
    // TODO: update db
  };

  useEffect(() => {
    setImmediate(async () => {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View style={{height: 40}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.smallItem}
            onPress={() => {
              if (isSortUp[0])
                dataList.sort((a, b) => {
                  let n = Number(a.mark) - Number(b.mark);
                  if (n === 0) return a.index - b.index;
                  return n;
                });
              else
                dataList.sort((a, b) => {
                  let n = Number(b.mark) - Number(a.mark);
                  if (n === 0) return a.index - b.index;
                  return n;
                });

              setDataList([...dataList]);
              isSortUp[0] = !isSortUp[0];
            }}>
            <Text style={{color: titleColor, textAlign: 'center'}}>关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallItem}
            onPress={() => {
              if (isSortUp[1])
                dataList.sort((a, b) => Number(a.index) - Number(b.index));
              else dataList.sort((a, b) => Number(b.index) - Number(a.index));
              setDataList([...dataList]);
              isSortUp[1] = !isSortUp[1];
            }}>
            <Text style={{color: titleColor, textAlign: 'center'}}>排行</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigItem}
            onPress={() => {
              if (isSortUp[2])
                dataList.sort((a, b) =>
                  String(a.symbol).toUpperCase() >
                  String(b.symbol).toUpperCase()
                    ? 1
                    : -1,
                );
              else
                dataList.sort((a, b) =>
                  String(b.symbol).toUpperCase() >
                  String(a.symbol).toUpperCase()
                    ? 1
                    : -1,
                );
              setDataList([...dataList]);
              isSortUp[2] = !isSortUp[2];
            }}>
            <Text style={{color: titleColor, textAlign: 'center'}}>代币</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigItem}
            onPress={() => {
              if (isSortUp[3])
                dataList.sort((a, b) => Number(a.price) - Number(b.price));
              else dataList.sort((a, b) => Number(b.price) - Number(a.price));
              setDataList([...dataList]);
              isSortUp[3] = !isSortUp[3];
            }}>
            <Text style={{color: titleColor, textAlign: 'center'}}>
              价格(
              {util.toPassTimeString(
                Math.floor((passTimestand - refreshTimestand) / 1000),
              )}
              )
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigItem}
            onPress={() => {
              if (isSortUp[4])
                dataList.sort(
                  (a, b) => Number(a.precent24h) - Number(b.precent24h),
                );
              else
                dataList.sort(
                  (a, b) => Number(b.precent24h) - Number(a.precent24h),
                );
              setDataList([...dataList]);
              isSortUp[4] = !isSortUp[4];
            }}>
            <Text style={{color: titleColor, textAlign: 'center'}}>
              24h({upCnt[1]}%)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigItem}
            onPress={() => {
              if (isSortUp[5])
                dataList.sort(
                  (a, b) => Number(a.precent7d) - Number(b.precent7d),
                );
              else
                dataList.sort(
                  (a, b) => Number(b.precent7d) - Number(a.precent7d),
                );
              setDataList([...dataList]);
              isSortUp[5] = !isSortUp[5];
            }}>
            <Text style={{color: titleColor, textAlign: 'center'}}>
              7d({upCnt[2]}%)
            </Text>
          </TouchableOpacity>
        </View>
        <Divider color={props.appTheme.dividerColor} />
      </View>
      <FlatList
        ref={flatListRef}
        data={dataList}
        extraData={dataList}
        keyExtractor={item => item.index}
        refreshing={isLoading}
        onRefresh={async () => {
          setIsLoading(true);
          await fetchData();
          setIsLoading(false);
        }}
        renderItem={({item}) => (
          <View style={{height: 40}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
              }}>
              <View style={[styles.smallItem, {alignItems: 'center'}]}>
                <View
                  style={[
                    {
                      backgroundColor: item.mark
                        ? item.color
                        : props.appTheme.markCircleColor,
                    },
                    styles.circle,
                  ]}
                  onStartShouldSetResponder={() => {
                    toggleMark(item.index);
                  }}></View>
              </View>
              <Text style={[styles.smallItem, {color: item.color}]}>
                {item.index}
              </Text>
              <Text style={[styles.bigItem, {color: item.color}]}>
                {item.symbol}
              </Text>
              <Text style={[styles.bigItem, {color: item.color}]}>
                {item.price}
              </Text>
              <Text style={[styles.bigItem, {color: item.color}]}>
                {util.toPercentString(item.precent24h)}
              </Text>
              <Text style={[styles.bigItem, {color: item.color}]}>
                {util.toPercentString(item.precent7d)}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallItem: {
    width: '10%',
    textAlign: 'center',
  },
  bigItem: {
    width: '20%',
    textAlign: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.5,
  },
});

export default Recent;
