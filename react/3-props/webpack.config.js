const webpack = require('webpack');

const babelLoader = {
  loader: 'babel-loader',
};

const tsLoader = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true, // do not check types during packaging
  },
};


const config = {
  mode: 'development',
  entry: './App.tsx',
  module: {
    rules: [
      { // transpilation of ts/tsx files
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [ // webpack runs the loaders in the reverse order
          babelLoader, tsLoader,
        ],
      },
      { // transpilation of js/jsx files
        test: /\.jsx?$/,
        use: [babelLoader],
      },
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
  },
};
module.exports = config;
