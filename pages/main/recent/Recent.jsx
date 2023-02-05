import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {ListItem} from '@rneui/themed';
import axios from 'axios';
import util from '../../../src/util';

const Recent = () => {
  const [dataList, setDataList] = useState([]);

  const fetchData = async () => {
    const url = 'https://api.alternative.me/v1/ticker/?limit=100';
    try {
      const resp = await axios.get(url);
      const rlist = resp.data;
      if (rlist.length !== 100) return;

      dataList.forEach((item, index) => {
        item.symbol = rlist[index].symbol;
        item.price = util.toFixedPrice(rlist[index].price_usd);
        item.precent1h = util.toPercentString(rlist[index].percent_change_1h);
        item.precent24h = util.toPercentString(rlist[index].percent_change_24h);
        item.precent7d = util.toPercentString(rlist[index].percent_change_7d);
      });

      setDataList([...dataList]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (dataList.length > 0) return;
    for (let i = 0; i < 100; i++) {
      dataList &&
        dataList.push({
          index: i + 1,
          symbol: 'N/A',
          price: 'N/A',
          precent1h: 'N/A',
          precent24h: 'N/A',
          precent7d: 'N/A',
          mark: false,
        });
    }
    fetchData();
  });

  return (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View>
        <ListItem bottomDivider>
          <Text style={styles.smallItem}>关注</Text>
          <Text style={styles.smallItem}>排行</Text>
          <Text style={styles.bigItem}>代币</Text>
          <Text style={styles.bigItem}>价格</Text>
          <Text style={styles.bigItem}>1h行情</Text>
          <Text style={styles.bigItem}>24h行情</Text>
          <Text style={styles.bigItem}>7d行情</Text>
        </ListItem>
      </View>
      <FlatList
        data={dataList}
        extraData={dataList}
        keyExtractor={item => item.index}
        renderItem={({item}) => (
          <ListItem bottomDivider>
            <View style={styles.smallItem}>
              <View
                style={[
                  {
                    backgroundColor: item.mark ? 'red' : 'lightgray',
                  },
                  styles.circle,
                ]}></View>
            </View>
            <Text style={styles.smallItem}>{item.index}</Text>
            <Text style={styles.bigItem}>{item.symbol}</Text>
            <Text style={styles.bigItem}>{item.price}</Text>
            <Text style={styles.bigItem}>{item.precent1h}</Text>
            <Text style={styles.bigItem}>{item.precent24h}</Text>
            <Text style={styles.bigItem}>{item.precent7d}</Text>
          </ListItem>
        )}
      />

      <Button
        title="add"
        onPress={() => {
          fetchData();
        }}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  smallItem: {
    width: '5%',
  },
  bigItem: {
    width: '15%',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Recent;
