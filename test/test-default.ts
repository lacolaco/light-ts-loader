import * as assert from "assert";

describe("default", () => {
  it("should import an ES6 module", () => {
    const ts = require("!raw-loader!../index.js!./fixtures/es6-module.ts");
    assert.strictEqual(
      ts,
      `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = function (a, b) {
    return a + b;
};
`
    );
  });
});
