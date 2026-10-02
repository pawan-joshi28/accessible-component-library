const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");
const { ModuleFederationPlugin } = container;
const deps = require("./package.json").devDependencies;

const REMOTE_URL = process.env.REMOTE_URL || "http://localhost:3001/remoteEntry.js";
const PUBLIC_PATH = process.env.PUBLIC_PATH || "auto";

const shared = {
  react: { singleton: true, requiredVersion: deps.react },
  "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
};

const base = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "swc-loader", exclude: /node_modules/, options: { jsc: { parser: { syntax: "typescript", tsx: true }, transform: { react: { runtime: "automatic" } } } } },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};

const remote = {
  ...base,
  name: "remote",
  entry: "./federation/remote/index.ts",
  output: { path: path.resolve(__dirname, "dist/remote"), publicPath: PUBLIC_PATH === "auto" ? "auto" : `${PUBLIC_PATH}/remote/`, clean: true },
  devServer: { port: 3001, headers: { "Access-Control-Allow-Origin": "*" }, hot: false },
  plugins: [
    new ModuleFederationPlugin({
      name: "uiRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button.tsx",
        "./TextField": "./src/components/TextField.tsx",
        "./Tabs": "./src/components/Tabs.tsx",
        "./Modal": "./src/components/Modal.tsx",
        "./Alert": "./src/components/Alert.tsx",
      },
      shared,
    }),
    new HtmlWebpackPlugin({ template: "./federation/remote/index.html" }),
  ],
};

const host = {
  ...base,
  name: "host",
  entry: "./federation/host/index.ts",
  output: { path: path.resolve(__dirname, "dist/host"), publicPath: PUBLIC_PATH === "auto" ? "auto" : `${PUBLIC_PATH}/host/`, clean: true },
  devServer: { port: 3000, hot: false },
  plugins: [
    new ModuleFederationPlugin({ name: "uiHost", remotes: { uiRemote: `uiRemote@${REMOTE_URL}` }, shared }),
    new HtmlWebpackPlugin({ template: "./federation/host/index.html" }),
  ],
};

module.exports = [remote, host];
