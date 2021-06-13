const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

console.log('======================');
console.log(`start ${process.env.NODE_ENV} build...`);

/** @type {webpack.Configuration} */
const config = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src', 'index.tsx'),
  target: ['web', 'es5'],
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: 'bundle.[chunkhash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts?|tsx?)$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        }
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    }
  },
  plugins: [
    // output html
    new HtmlWebpackPlugin({
      filename: path.resolve("build", "index.html"),
      template: path.resolve("public", "template.html"),
    }),
  ]
};

if (process.env.NODE_ENV === "development") {
  config["devtool"] = 'inline-source-map';
}

if (process.env.NODE_ENV === "production") {
  config["plugins"] = [
    ...config["plugins"],
    // service worker creater
    new WorkboxWebpackPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: new RegExp(/\.(js?|html?|ico?|txt?|png?|css?)$/),
          handler: "CacheFirst",

          options: {
            cacheName: 'main',
            expiration: {
              maxEntries: 20,
            }
          }
        }
      ],
      mode: process.env.NODE_ENV,
      cleanupOutdatedCaches: true,
      swDest: path.join(__dirname, "build") + '/sw.js',
      sourcemap: false,
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
}

module.exports = config;