"use strict";

const assert = require("assert");

describe("2.1-syntaxes", () => {
    it("should import a module written in TS2.1", () => {
        const ts = require("!raw-loader!../index.js!./fixtures/2.1-syntaxes.ts");
        assert.strictEqual(ts, `"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function getObjectKeys(state) {
    return Object.keys(state).reduce(function (p, key) {
        return __assign({}, p, (_a = {}, _a[key] = key, _a));
        var _a;
    }, {});
}
exports.getObjectKeys = getObjectKeys;
`);
    });
});
