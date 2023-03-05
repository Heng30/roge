import {Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import Theme from '../../../../src/theme';
import DB from '../../../../src/db';

const Sync = props => {
  const appTheme = props.appTheme;

  return (
    <View style={{paddingBottom: Theme.constant.padding}}>
      <View
        style={{
          backgroundColor: appTheme.floatBGColor,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: appTheme.fontSize + 2,
            padding: Theme.constant.padding,
            color: appTheme.fontColor,
          }}>
          同步
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={async () => {
              await DB.uploadAllData(errors => {
                if (errors.length <= 0) {
                  Toast.show('上传成功!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.TOP,
                    backgroundColor: appTheme.floatBGColor,
                    textColor: Theme.constant.succeedColor,
                    shadow: false,
                  });
                } else {
                  let estr = '';
                  errors.forEach(item => {
                    estr += String(item) + '\n';
                  });
                  estr = estr.trim();
                  Toast.show(`上传失败!\n原因: ${estr}`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.TOP,
                    backgroundColor: appTheme.floatBGColor,
                    textColor: Theme.constant.failedColor,
                    shadow: false,
                  });
                }
              });
            }}>
            <Text
              style={{
                paddingHorizontal: Theme.constant.padding * 5,
                color: appTheme.fontColor,
              }}>
              上传
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await DB.downloadAllData(errors => {
                if (errors.length <= 0) {
                  Toast.show('下载成功! 重启生效。', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.TOP,
                    backgroundColor: appTheme.floatBGColor,
                    textColor: Theme.constant.succeedColor,
                    shadow: false,
                  });
                } else {
                  let estr = '';
                  errors.forEach(item => {
                    estr += String(item) + '\n';
                  });
                  estr = estr.trim();
                  Toast.show(`上传失败!\n原因: ${estr}`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.TOP,
                    backgroundColor: appTheme.floatBGColor,
                    textColor: Theme.constant.failedColor,
                    shadow: false,
                  });
                }
              });
            }}>
            <Text
              style={{
                paddingHorizontal: Theme.constant.padding * 5,
                color: appTheme.fontColor,
              }}>
              下载
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Sync;
