const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
//   entry: {
//     client: './src/index.js',
//   },
//   entry: path.join(__dirname, "src", "index.js"),
  entry: './src/index.js',
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    //   {
    //     test: /\.css$/i,
    //     use: ["style-loader", "css-loader"],
    //   },
    //   {
    //     test: /\.(png|jp(e*)g|svg|gif)$/,
    //     use: ['file-loader'],
    //   },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|svg|jp(e*)g|webp|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
//   resolve: {
//     modules: ['node_modules', './src'],
//     extensions: ['.js', '.jsx'],
//     alias: {
//       css: path.resolve(__dirname, 'assets', 'css'),
//       src: path.resolve(__dirname, './src/'),
//     },
//   },
resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('./public/index.html'),
        favicon: path.resolve('./public/favicon.ico')
    }),
  ],
}