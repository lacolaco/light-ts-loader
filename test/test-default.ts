"use strict";

const assert = require("assert");

describe("default", () => {
    it("should import an ES6 module", () => {
        const ts = require("!raw-loader!../index.js!./fixtures/es6-module.ts");
        assert.strictEqual(ts, `"use strict";
exports.sum = function (a, b) {
    return a + b;
};
`);
    });
});
