import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export const entry = {
  popup: "./src/extension/popup/index.html",
  background: "./src/extension/background.ts",
};
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "[name].js",
};
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/extension/popup/index.html",
    filename: "popup.html",
    chunks: ["popup"],
  }),
  new CopyPlugin({
    patterns: [{ from: "public" }],
  }),
];
