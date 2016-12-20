"use strict";

const webpack = require("webpack");
const fse = require("fs-extra");

const TEST_CASES = [
    "default",
    "commonjs",
    "explicit-config",
];

fse.removeSync("build");

TEST_CASES.forEach((c) => {
    const configPath = `./test/webpack-${c}.config.js`;
    const buildPath = `./build/test-${c}.test.js`;

    fse.removeSync(buildPath);
    webpack(require(configPath), (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
            return;
        }
    });
});
