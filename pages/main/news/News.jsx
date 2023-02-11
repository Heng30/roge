import React from 'react';
import {View, Text, Button} from 'react-native';
import Toast from 'react-native-root-toast';

const News = props => {
  let toast = null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        title="Toast"
        onPress={() => {
          toast = Toast.show('This is a message', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
              backgroundColor: 'gray',
              textColor: 'black',
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
              // calls on toast\`s appear animation start
            },
            onShown: () => {
              // calls on toast\`s appear animation end.
            },
            onHide: () => {
              // calls on toast\`s hide animation start.
            },
            onHidden: () => {
              // calls on toast\`s hide animation end.
            },
          });
        }}></Button>

      <Button title="hide" style={{padding: 20}} onPress={() => {Toast.hide(toast)}}>
        Hide
      </Button>
    </View>
  );
};

export default News;
