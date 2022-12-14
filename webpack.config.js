const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve("./src/popup/index.tsx"),
    // background: path.resolve("./src/background/background.ts"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.css$/i,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve("src/manifest.json"), to: path.resolve("dist") },
        { from: path.resolve("public/hiring.png"), to: path.resolve("dist") },
      ],
    }),
    new HTMLPlugin({
      title: "Simple Job Search",
      filename: "index.html",
      chunks: ["index"],
    }),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      tls: false,
      child_process: false,
      fs: false,
      crypto: false,
      net: false,
    },
  },
  output: {
    filename: "[name].js",
  },
  devtool: "cheap-module-source-map",
};
