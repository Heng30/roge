import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import Theme from '../../src/theme';
import {Button} from '@rneui/themed';

const My = props => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: props.appTheme.backgroundColor}}>
      <Button
        onPress={() => {
          if (Theme.mode === 'light') {
            props.setAppTheme(Theme.dark);
            Theme.mode = 'dark';
          } else {
            props.setAppTheme(Theme.light);
            Theme.mode = 'light';
          }
        }}>
        修改主题
      </Button>
    </SafeAreaView>
  );
};

export default My;
