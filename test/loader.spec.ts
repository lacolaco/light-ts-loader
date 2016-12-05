import assert = require("assert");
import fs = require("fs");
import path = require("path");
import loader = require("../index");

describe("loader", () => {

    it("should load main.ts", () => {
        const fixture = fs.readFileSync(path.resolve("test/fixtures/main.ts")).toString();

        const cb = (err: Error, result: string, sourcemap: any) => {
            if (err) {
                throw err;
            }
            assert.deepStrictEqual(result, `"use strict";
var sub_1 = require("./sub");
function main() {
    console.log(sub_1.sub);
}
main();
`
            );
        };

        loader.call({
            cacheable: () => { },
            async: () => cb,
        }, fixture);
    });

    it("should load sub.ts", () => {
        const fixture = fs.readFileSync(path.resolve("test/fixtures/sub.ts")).toString();

        const cb = (err: Error, result: string, sourcemap: any) => {
            if (err) {
                throw err;
            }
            assert.deepStrictEqual(result, `"use strict";
var path = require("path");
exports.sub = path.join(__dirname, "sub");
`
            );
        };

        loader.call({
            cacheable: () => { },
            async: () => cb,
        }, fixture);
    });
});
