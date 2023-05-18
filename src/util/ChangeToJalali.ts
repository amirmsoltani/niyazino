const mapToJalali = {
  second: 'چند ثانیه',
  minute: 'دقیقه',
  hour: 'ساعت',
  day: 'روز',
  days: 'روز',
  month: 'ماه',
  year: 'سال',
  few: '',
  'a ': '',
  ago: 'قبل',
  an: '۱',
  's ': ' ',
};
const mapNumberToPersian = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
};

export const changeToJalali = (subtract: string) => {
  if (subtract in mapToJalali) {
    return mapToJalali[subtract as keyof typeof mapToJalali];
  } else if (subtract.match(/\d/g)) {
    return subtract
      .split('')
      .map(n => mapNumberToPersian[n as keyof typeof mapNumberToPersian])
      .join('');
  }
  return '';
};

export const regMapToJalali = new RegExp(
  `(${Object.keys(mapToJalali).join('|')}|[0-9])`,
  'g',
);
