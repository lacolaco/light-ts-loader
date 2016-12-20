const path = require("path");

module.exports = {
    target: "node",
    context: __dirname,
    entry: "./test-commonjs.ts",
    output: {
        filename: "test-commonjs.test.js",
        path: path.join(__dirname, "..", "build")
    },
};