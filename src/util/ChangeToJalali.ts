const mapToJalali = {
  second: 'چند ثانیه',
  minute: 'دقیقه',
  hour: 'ساعت',
  day: 'روز',
  days: 'روز',
  month: 'ماه',
  year: 'سال',
  few: '',
  'a ': '۱ ',
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

export const convertNumToPersian = (num: string) => {
  return num
    .split('')
    .map(n =>
      n in mapNumberToPersian
        ? mapNumberToPersian[n as keyof typeof mapNumberToPersian]
        : n,
    )
    .join('');
};

export const changeToJalali = (subtract: string) => {
  if (subtract in mapToJalali) {
    return mapToJalali[subtract as keyof typeof mapToJalali];
  } else if (subtract.match(/\d/g)) {
    return convertNumToPersian(subtract);
  }
  return '';
};

export const regMapToJalali = new RegExp(
  `(${Object.keys(mapToJalali).join('|')}|[0-9])`,
  'g',
);
