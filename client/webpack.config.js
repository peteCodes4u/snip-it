const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'SNIP-IT',
      }),

      // inject service worker into webpack bundle
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // manifest 
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'SNIP-IT with JATE',
        description: 'code snip / text editor app that maintains functionality when offline',
        short_name: 'J.A.T.E.',
        start_url: '/',
        publicPath: '/',
        background_color: '#31a9e1',
        theme_color: '#31a9e1',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [ 96, 128, 192, 256, 384, 512 ],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // TODO: Add CSS loaders and babel to webpack.
        // css loader
        {
          test: /\.css$/i,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          // babel
          use: {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env' ],
              plugins: [ '@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime' ]
            }
          }
        }
      ],
    },
  };
};
