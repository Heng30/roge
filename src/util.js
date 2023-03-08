function toBillion(num) {
  return (num / (1000 * 1000 * 1000)).toFixed(2) + 'B';
}

function toMillion(num) {
  return (num / (1000 * 1000)).toFixed(2) + 'M';
}

function toThousand(num) {
  return (num / 1000).toFixed(2) + 'K';
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

function toPassTimeString(num) {
  num = Number(num);
  if (num < 0) return '0s';
  else if (num < 60) return String(num) + 's';
  else if (num < 3600) return String(Math.floor(num / 60)) + 'm';
  else if (num < 86400) return String(Math.floor(num / 3600)) + 'h';
  else return String(Math.floor(num / 86400)) + 'd';
}

function toDateString(timestamp, mode) {
  if (!timestamp) return '';
  let date = new Date(timestamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  if (mode === 0) return month + '-' + day + ' ' + hours + ':' + minutes;
  else if (mode === 1) return month + '-' + day;
  else if (mode === 2) return hours + ':' + minutes;
}

function paddingSpaces(num) {
  return new Array(Number(num)).join(' ');
}

export default {
  toFixedPrice,
  toPercentString,
  toPassTimeString,
  toDateString,
  paddingSpaces,
};
