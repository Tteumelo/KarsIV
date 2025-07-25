module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens'
          }
        }
      ]
    ]
  };