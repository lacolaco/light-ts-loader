import * as assert from "assert";

describe("explicit-config", () => {
  it("should use tsconfig.explicit-config.json", () => {
    const ts = require("!raw-loader!../index.js!./fixtures/es6-module.ts");
    assert.strictEqual(
      ts,
      `export const sum = (a, b) => {
    return a + b;
};
`
    );
  });
});
