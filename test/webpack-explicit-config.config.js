const path = require("path");
const webpack = require("webpack");

module.exports = {
    target: "node",
    context: __dirname,
    entry: "./test-explicit-config.ts",
    output: {
        filename: "test-explicit-config.test.js",
        path: path.join(__dirname, "..", "build")
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            tsConfigPath: path.join(__dirname, "tsconfig.explicit-config.json"),
        }),
    ],
};