import * as assert from "assert";

describe("2.1-syntaxes", () => {
  it("should import a module written in TS2.1", () => {
    const ts = require("!raw-loader!../index.js!./fixtures/2.1-syntaxes.ts");
    assert.strictEqual(
      ts,
      `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getObjectKeys(state) {
    return Object.keys(state).reduce(function (p, key) {
        return __assign({}, p, (_a = {}, _a[key] = key, _a));
        var _a;
    }, {});
}
exports.getObjectKeys = getObjectKeys;
`
    );
  });
});
