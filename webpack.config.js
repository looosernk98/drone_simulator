const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

module.exports = {
  mode: "development",
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: "url-loader?name=[name].[ext]",
      },
      {
        test: /\.(png|svg|jp(e*)g|webp|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // Creates 'style' nodes from JS strings
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles SASS to CSS
          {
            loader: "postcss-loader", // for autoprefixer
            options: {
              sourceMap: true,
              config: {
                path: "postcss.config.js",
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Your HTML template
      filename: "index.html", // Output HTML file
      favicon: path.resolve('./public/favicon.ico'),
      manifest: "./public/manifest.json",
    }),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
      seed: {},
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // Automatically resolve these file extensions
    // alias: {
    //   '@': path.resolve(__dirname, 'src'), // Alias for 'src' directory
    // },
  },
};
