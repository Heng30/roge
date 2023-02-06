import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {ListItem} from '@rneui/themed';
import axios from 'axios';
import util from '../../../src/util';

const Recent = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upCnt, setUpCnt] = useState([0, 0, 0]);
  const [titleColor, setTitleColor] = useState('black');

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
            mark: false,
          });
        }
      }

      let ucnt = [0, 0, 0];
      dataList.forEach((item, index) => {
        item.symbol = rlist[index].symbol;
        item.price = util.toFixedPrice(rlist[index].price_usd);
        item.precent1h = util.toPercentString(rlist[index].percent_change_1h);
        item.precent24h = util.toPercentString(rlist[index].percent_change_24h);
        item.precent7d = util.toPercentString(rlist[index].percent_change_7d);

        if (Number(rlist[index].percent_change_1h) >= 0) {
          ucnt[0]++;
        }

        if (Number(rlist[index].percent_change_24h) >= 0) {
          item.color = 'green';
          ucnt[1]++;
        } else {
          item.color = 'red';
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

      setTitleColor(ucnt[1] >= 50 ? 'green' : 'red');
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
      <View>
        <ListItem bottomDivider>
          <Text style={[styles.smallItem, {color: titleColor}]}>关注</Text>
          <Text style={[styles.smallItem, {color: titleColor}]}>排行</Text>
          <Text style={[styles.bigItem, {color: titleColor}]}>代币</Text>
          <Text style={[styles.bigItem, {color: titleColor}]}>价格</Text>
          <Text style={[styles.bigItem, {color: titleColor}]}>
            1d({upCnt[1]}%)
          </Text>
          <Text style={[styles.bigItem, {color: titleColor}]}>
            7d({upCnt[2]}%)
          </Text>
        </ListItem>
      </View>
      <FlatList
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
          <ListItem bottomDivider>
            <View style={styles.smallItem}>
              <View
                style={[
                  {
                    backgroundColor: item.mark ? item.color : 'lightgray',
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
              {item.precent24h}
            </Text>
            <Text style={[styles.bigItem, {color: item.color}]}>
              {item.precent7d}
            </Text>
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallItem: {
    width: '8%',
  },
  bigItem: {
    width: '16%',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Recent;
