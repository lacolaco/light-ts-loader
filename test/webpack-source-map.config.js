const path = require("path");
const webpack = require("webpack");

module.exports = {
    target: "node",
    context: __dirname,
    entry: "./test-source-map.ts",
    output: {
        filename: "test-source-map.test.js",
        path: path.join(__dirname, "..", "build")
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            tsConfigPath: path.join(__dirname, "tsconfig.source-map.json"),
        }),
    ],
    devtool: "source-map",
};