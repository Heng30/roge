import React from 'react';
import {View, Text, Button} from 'react-native';
import Toast from 'react-native-root-toast';

const News = props => {
  const appTheme = props.appTheme;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: appTheme.fontColor, fontSize: 30}}>没有实现</Text>
    </View>
  );
};

export default News;
