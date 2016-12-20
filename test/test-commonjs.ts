"use strict";

const assert = require("assert");

describe("commonjs", () => {
    it("should import an CommonJS module", () => {
        const ts = require("!raw-loader!../index.js!./fixtures/commonjs-module.ts");
        assert.strictEqual(ts, `"use strict";
module.exports = function (a, b) {
    return a + b;
};
`);
    });
});
