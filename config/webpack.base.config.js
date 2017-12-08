import Config from "webpack-config";
import HtmlWebpackPlugin from "html-webpack-plugin";
const path = require("path");

export default new Config().merge({
  entry: ["babel-polyfill", "./src/index.jsx"],
  output: {
    path: path.join(__dirname, "/../public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules"),
      path.resolve("./flow-typed")
    ],
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "/images/[name]__[hash:base64:5].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    })
  ]
});
