import axios from 'axios';
import Theme from '../../../src/theme';
import util from '../../../src/util';
import CONSTANT from '../../../src/constant';

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
          Number(item[4]) >= 0
            ? Theme.constant.upColor
            : Theme.constant.downColor,
      };
    });
    cb(items);
  } catch (e) {
    errors.push(e);
  }
};

const CPO_FearGreed = async (cb, errors) => {
  const url = 'https://api.alternative.me/fng/?limit=2';
  try {
    const resp = await axios.get(url);
    const data = resp.data.data;
    if (!data && data.length != 2) return;

    const item = {
      name: '恐惧贪婪指数(今天/昨天)',
      value: `${data[0].value}/${data[1].value}`,
      color:
        Number(data[0].value) >= 50
          ? Theme.constant.upColor
          : Theme.constant.downColor,
    };
    cb(item);
  } catch (e) {
    errors.push(e);
  }
};

const CPO_Market = async (cb, errors) => {
  const url = 'https://api.alternative.me/v1/global/';
  try {
    const resp = await axios.get(url);
    const data = resp.data;
    if (!data) return;

    const items = [
      {
        name: '加密市场总市值/24小时交易量',
        value: `${util.toFixedPrice(
          data.total_market_cap_usd,
        )}/${util.toFixedPrice(data.total_24h_volume_usd)}`,
        color:
          Number(data.total_market_cap_usd) >= 1e12
            ? Theme.constant.upColor
            : Theme.constant.downColor,
      },
      {
        name: 'BTC市值占比',
        value: util.toPercentString(data.bitcoin_percentage_of_market_cap),
        color:
          Number(data.bitcoin_percentage_of_market_cap) >= 50
            ? Theme.constant.upColor
            : Theme.constant.downColor,
      },
    ];
    cb(items);
  } catch (e) {
    errors.push(e);
  }
};

const CPO_ETHBurned = async (cb, errors) => {
  const url = 'https://api.btc126.vip/etherchain.php?from=ethburn';
  try {
    const resp = await axios.get(url);
    const data = resp.data;
    if (!data) return;

    const item = {
      name: 'ETH总燃烧量/24小时速率',
      value: `${util.toFixedPrice(
        Number(data.total_burned) / CONSTANT.WEI_PER_ETH,
      )}/${util.toFixedPrice(
        Number(data.burn_rate_24_h) / CONSTANT.WEI_PER_ETH,
      )}`,
      color:
        Number(data.burn_rate_1_h) >= Number(data.burn_rate_24_h)
          ? Theme.constant.upColor
          : Theme.constant.downColor,
    };
    cb(item);
  } catch (e) {
    errors.push(e);
  }
};

const CPO_LongShort = async (cb, errors) => {
  const url = 'https://api.btc126.vip/bybt.php?from=24h';
  try {
    const resp = await axios.get(url);
    const data = resp.data.data;
    if (!data) return;

    const item = {
      name: `${data[0].symbol}多空比`,
      value: util.toPercentString(data[0].longRate),
      color:
        Number(data[0].longRate) >= 50
          ? Theme.constant.upColor
          : Theme.constant.downColor,
    };
    cb(item);
  } catch (e) {
    errors.push(e);
  }
};

const CPO_Blast = async (cb, errors) => {
  const url = 'https://api.btc126.vip/bicoin.php?from=24hbaocang';
  try {
    const resp = await axios.get(url);
    const data = resp.data.data;
    if (!data) return;

    const item = {
      name: '合约爆仓量(1小时/24小时)',
      value: `${util.toFixedPrice(data.totalBlastUsd1h)}/${util.toFixedPrice(
        data.totalBlastUsd24h,
      )}`,
      color:
        Number(data.totalBlastUsd1h) * 24 >= Number(data.totalBlastUsd24h)
          ? Theme.constant.upColor
          : Theme.constant.downColor,
    };
    cb(item);
  } catch (e) {
    errors.push(e);
  }
};

export default {
  ECO,
  CPO_FearGreed,
  CPO_Market,
  CPO_ETHBurned,
  CPO_LongShort,
  CPO_Blast,
};
