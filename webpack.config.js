const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',

    './src/app.tsx'
  ],
  output: { filename: './build/app.js' },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/,
      }
    ]
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  }
};
