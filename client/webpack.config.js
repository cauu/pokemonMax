var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

/*
extract-text-webpack-plugin插件，
有了它就可以将你的样式提取到单独的css文件里，
妈妈再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var AssetsPlugin = require('assets-webpack-plugin');
/*
html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var chunks = Object.keys(entries);

const nodeEnv = process.env.NODE_ENV || 'development';
// const env = {
//   NODE_ENV: process.env.NODE_ENV || 'development'
// };
const debug = nodeEnv!== 'production';

var config = {
    devtool: !debug? 'hidden-source-map' : 'cheap-eval-source-map',
    entry: {
      app: path.resolve(APP_PATH, 'app.jsx'),
      vendor: [
        'react',
        'react-dom',
        'redux',
        'history',
        'lodash',
        'bluebird'
      ]
    },
    output: { 
        // path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        path: BUILD_PATH,
        // publicPath: '/dist/',                //模板、样式、脚本、图片等资源对应的server上的路径
        filename: debug ? '[name].js': '[name].[hash].js',            //每个页面对应的主js的生成配置
        // chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
    resolve: {
      root: [ path.join(__dirname, 'src') ]
    },
    module: {
        loaders: [
          {
            test: /\.(jsx?|js)$/,
            include: APP_PATH,
            exclude: /node_modules/,
            loaders: [
              {
                loader: 'babel',
                query: {
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: /\.(scss|css)$/,
            // loaders: [ 'style', 'css', 'sass'],
            loaders: !!debug ? [ 'style', 'css', 'sass' ] : ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' }),
            include: APP_PATH
          },
          {
            test: /\.(mp3|mp4|wav|ico|gif|png|jpg|jpeg|ttf|eot|svg|woff|otf(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file'
          },
          {
            test: /\.(json)$/,
            loader: 'json-loader'
          },
          {
            test: /\.xml$/,
            loader: 'xml-loader'
          }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
        })
    ],
};

if(debug) {
  config.entry.dev = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server'
  ];

  config.module.loaders[0].loaders[0].query = {
    "env": {
      "development": {
        "presets": ["react-hmre"]
      }
    }
  };

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filname: 'vendor.js'
    })
  ]);

  config.output.publicPath = 'http://localhost:3001/static';
}
else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin('main.css'),  
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false,
    }),
    new AssetsPlugin({ path: path.join(__dirname, 'dist') })
  ]);
}

module.exports = config;

