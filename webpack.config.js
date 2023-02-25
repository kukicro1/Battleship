const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      // test: /\.js$/,
      // exclude: './node_modules',
      // use: 'babel-loader',
      // },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      config$: './configs/app-config.js',
      react: './vendor/react-master',
    },
    // extension: ['.js', '.jsx'],
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules',
    ],
  },
}
