"use strict";

const path = require("path");
const webpack = require("webpack");
const fse = require("fs-extra");

const TEST_CASES = [
    "default",
    "commonjs",
    "explicit-config",
    "2.1-syntaxes",
    "source-map",
];

fse.removeSync("build");

TEST_CASES.forEach((c) => {
    const configPath = `./test/webpack-${c}.config.js`;
    const buildPath = `./build/test-${c}.test.js`;

    fse.removeSync(buildPath);
    const config = require(configPath);
    config.resolve = {
        extensions: [".ts", ".js"],
    };
    config.module = {
        rules: [
            {
                test: /\.ts$/,
                loader: path.resolve("./index.js"),
            }
        ],
    };
    webpack(config, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
            return;
        }
    });
});
