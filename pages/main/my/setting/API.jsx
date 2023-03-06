import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState, useEffect} from 'react';
import {Divider} from '@rneui/themed';
import Toast from 'react-native-root-toast';
import Theme from '../../../../src/theme';
import DB from '../../../../src/db';

const API = props => {
  const appTheme = props.appTheme;
  const [syncsvrAPI, setSyncsvrAPI] = useState('');

  useEffect(() => {
    DB.settingTable.get('syncsvrAPI', value => {
      setSyncsvrAPI(value);
    });
  }, []);

  return (
    <View style={{paddingBottom: Theme.constant.padding}}>
      <View
        style={{
          backgroundColor: appTheme.floatBGColor,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: appTheme.fontSize + 2,
            padding: Theme.constant.padding,
            color: appTheme.fontColor,
          }}>
          API
        </Text>
        <Divider></Divider>
        <View
          style={{
            flexDirection: 'row',
            padding: Theme.constant.padding,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: appTheme.fontSize,
              color: appTheme.fontColor,
              paddingRight: Theme.constant.padding,
            }}>
            同步服务器:
          </Text>
          <TextInput
            style={{
              padding: 2,
              flex: 1,
              height: appTheme.fontSize + Theme.constant.padding,
              borderColor: appTheme.borderColor,
              borderWidth: Theme.constant.borderWidth,
              color: appTheme.fontColor,
            }}
            onChangeText={text => setSyncsvrAPI(text)}
            value={syncsvrAPI}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Theme.constant.padding,
          }}>
          <TouchableOpacity
            onPress={() => {
              DB.settingTable.get('syncsvrAPI', value => {
                setSyncsvrAPI(value);
              });
            }}>
            <Text
              style={{
                paddingHorizontal: Theme.constant.padding * 5,
                color: appTheme.fontColor,
              }}>
              取消
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              DB.settingTable.update('syncsvrAPI', syncsvrAPI.trim());
              Toast.show('保存成功!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                backgroundColor: appTheme.floatBGColor,
                textColor: Theme.constant.succeedColor,
                shadow: false,
              });
            }}>
            <Text
              style={{
                paddingHorizontal: Theme.constant.padding * 5,
                color: appTheme.fontColor,
              }}>
              确定
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default API;
