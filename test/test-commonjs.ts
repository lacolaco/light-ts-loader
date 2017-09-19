import * as assert from "assert";

describe("commonjs", () => {
  it("should import an CommonJS module", () => {
    const ts = require("!raw-loader!../index.js!./fixtures/commonjs-module.ts");
    assert.strictEqual(
      ts,
      `module.exports = function (a, b) {
    return a + b;
};
`
    );
  });
});
