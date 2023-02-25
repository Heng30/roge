import {View} from 'react-native';
import Quick from './Quick';

const News = props => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Quick {...props} />
    </View>
  );
};

export default News;
