function toBillion(num) {
  return (num / (1000 * 1000 * 1000)).toFixed(2) + 'B';
}

function toMillion(num) {
  return (num / (1000 * 1000)).toFixed(2) + 'M';
}

function toThousand(num) {
  return (num / 1000).toFixed(2) + 'K';
}

function asBillion(num, fixed) {
  return Number((num / (1000 * 1000 * 1000)).toFixed(fixed));
}

function billionAsNum(num) {
  return Number(num) * 1000 * 1000 * 1000;
}

function millionAsNum(num) {
  return Number(num) * 1000 * 1000;
}

function asMillion(num, fixed) {
  return Number((num / (1000 * 1000)).toFixed(fixed));
}

function asMillionOrBillion(num, fixed) {
  if (Number(num) > 1000 * 1000 * 1000) return asBillion(num, fixed);

  return asMillion(num, fixed);
}

function isAsBillion(num) {
  if (Number(num) > 1000 * 1000 * 1000) return true;

  return false;
}

function toFixedPrice(num) {
  num = Number(num);
  var flag = num > 0;
  num = Math.abs(num);
  const billion = 1000 * 1000 * 1000;
  const million = 1000 * 1000;
  if (num >= billion) return flag ? toBillion(num) : -toBillion(num);
  else if (num >= million) return flag ? toMillion(num) : -toMillion(num);
  else if (num >= 1000 * 100) return flag ? toThousand(num) : -toThousand(num);
  else if (num >= 1000) return flag ? num.toFixed(0) : -num.toFixed(0);
  else if (num >= 0.01) return flag ? num.toFixed(2) : -num.toFixed(2);
  else if (num >= 0.0001) return flag ? num.toFixed(4) : -num.toFixed(4);
  else return flag ? num.toFixed(6) : -num.toFixed(6);
}

function toPercentString(num) {
  return Number(num).toFixed(2) + '%';
}

export default {
  toFixedPrice,
  toPercentString,
};
