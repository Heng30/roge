import React from 'react';
import {View, Button} from 'react-native';
import Quick from './Quick';

const News = props => {
  const appTheme = props.appTheme;

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Quick
        appTheme={appTheme}
        isDoubleClickNewsBtn={props.isDoubleClickNewsBtn}
        isJump2News={props.isJump2News}
        currentIndex={props.currentIndex}
      />
    </View>
  );
};

export default News;
