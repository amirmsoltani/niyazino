module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/jsx-sort-props': [
      2,
      {
        noSortAlphabetically: false,
        ignoreCase: true,
        callbacksLast: false,
        shorthandLast: true,
        reservedFirst: true,
        multiline: 'last',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
  },
};
