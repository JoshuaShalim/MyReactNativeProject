module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
  // Prevent autolinking of JS-only packages that don't ship an Android library
  dependencies: {
    'react-native-get-random-values': {
      platforms: { android: null },
    },
    'react-native-url-polyfill': {
      platforms: { android: null },
    },
    'react-native-vector-icons': {
      platforms: { android: null },
    },
  },
};