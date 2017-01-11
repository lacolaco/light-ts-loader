const path = require("path");

module.exports = {
    target: "node",
    context: __dirname,
    entry: "./test-2.1-syntaxes.ts",
    output: {
        filename: "test-2.1-syntaxes.test.js",
        path: path.join(__dirname, "..", "build")
    }
};