const path = require("path");

module.exports = {
    target: "node",
    context: __dirname,
    entry: "./test-default.ts",
    output: {
        filename: "test-default.test.js",
        path: path.join(__dirname, "..", "build")
    }
};