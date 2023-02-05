import {StyleSheet, View} from 'react-native';
import {Tab, TabView} from '@rneui/themed';
import React, {useState} from 'react';

import Recent from './recent/Recent';
import My from './My';

const Main = () => {
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.mainContainer}>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{width: '100%'}}>
                    <Recent />
                </TabView.Item>
                <TabView.Item style={{width: '100%'}}>
                    <My />
                </TabView.Item>
            </TabView>

            <Tab
                value={index}
                onChange={e => setIndex(e)}
                buttonStyle={(_active) => ({
                    backgroundColor: 'steelblue',
                    height: 45,
                })}
                disableIndicator
                variant="primary">
                <Tab.Item
                    title="行情"
                    titleStyle={
                        index === 0
                            ? styles.tabTitleActive
                            : styles.tabTitleInactive
                    }
                    icon={{
                        name: 'timer',
                        type: 'ionicon',
                        color: index === 0 ? 'black' : 'white',
                    }}
                />

                <Tab.Item
                    title="我的"
                    titleStyle={
                        index === 1
                            ? styles.tabTitleActive
                            : styles.tabTitleInactive
                    }
                    icon={{
                        name: 'heart',
                        type: 'ionicon',
                        color: index === 1 ? 'black' : 'white',
                    }}
                />
            </Tab>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: '100%',
    },

    tabTitleActive: {
        fontSize: 12,
        color: 'black',
    },
    tabTitleInactive: {
        fontSize: 12,
        color: 'white',
    },
});

export default Main;
