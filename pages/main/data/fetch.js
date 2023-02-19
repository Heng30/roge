import axios from 'axios';
import Theme from '../../../src/theme';
import util from '../../../src/util';

const ECO = async (cb, errors) => {
  const url =
    'https://api-ddc-wscn.awtmt.com/market/real?fields=prod_name%2Cpreclose_px%2Clast_px%2Cpx_change%2Cpx_change_rate%2Cprice_precision&prod_code=000001.SS%2CDXY.OTC%2CUS10YR.OTC%2CUSDCNH.OTC%2C399001.SZ%2C399006.SZ%2CUS500.OTC%2CEURUSD.OTC%2CUSDJPY.OTC';
  try {
    const resp = await axios.get(url);
    const data = resp.data.data.snapshot;
    if (!data) return;
    const items = Object.values(data).map(function (item) {
      return {
        name: item[0],
        value: Number(item[2]).toFixed(2),
        rate: util.toPercentString(Number(item[4])),
        color:
          Number(item[4]) < 0
            ? Theme.constant.upColor
            : Theme.constant.downColor,
      };
    });
    cb(items);
  } catch (e) {
    errors.push(e);
  }
};

// const dataCPO = [
//   '加密货币总市值(美元)',
//   '24小时交易量(美元)',
//   '24小时BTC多空比',
//   'BTC市值占比',
//   '今日/昨日贪婪指数',
//   '以太坊油费',
// ];

export default {
  ECO,
};
