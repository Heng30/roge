import React from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const HomeScreen = props => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => {
        console.log(props.screenProps);
        props.navigation.navigate('Details');
      }}
      title="Go to details"
    />
  </View>
);

const DetailsScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Details Screen</Text>
  </View>
);

const Foo = () => <Text>HOME</Text>;

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: () => <Foo />,
      headerShown: false,
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="black"
        />
      ),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'red',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'blue',
      },
    },
  },

  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
      headerTintColor: 'red',
    },
  },
});

export default createAppContainer(AppNavigator);
