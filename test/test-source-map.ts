import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as sourceMap from "source-map";

function searchLine(target, s) {
  let lineNumber = null;
  s.split("\n").forEach((line, i) => {
    if (lineNumber !== null) {
      return;
    }
    if (target === line) {
      lineNumber = i + 1;
    }
  });
  return lineNumber;
}

describe("sourceMap", () => {
  it("should emit correct source-map", () => {
    // to add es6-module.ts into bundle
    const _ = require("!../index.js!./fixtures/source-map.ts");

    const bundle = fs
      .readFileSync(path.resolve("./build/test-source-map.test.js"))
      .toString();
    const mapStr = fs
      .readFileSync(path.resolve("./build/test-source-map.test.js.map"))
      .toString();
    const map = JSON.parse(mapStr);
    const consumer = new sourceMap.SourceMapConsumer(map);

    assert.ok(
      map.sources.indexOf("webpack:///./fixtures/source-map.ts") !== -1
    );

    /**
         * ```
         * interface Person {
         *     name: string;
         * }
         * 
         * export function createPerson(name: string): Person {
         *     return { name };　<--[6]
         * ____^[4]
         * }
         * ```
         * 
         * into
         * 
         * ```
         * "use strict";
         * 
         * function createPerson(name) {
         *     return { name: name };　<-- [?]
         * }
         * exports.createPerson = createPerson;
         * ```
         */
    const generatedPos = consumer.generatedPositionFor({
      source: "webpack:///fixtures/source-map.ts",
      line: 6,
      column: 4
    });
    console.log(generatedPos);
    const generatedTargetLine = searchLine(
      "    return { name: name };",
      bundle
    );
    assert.deepStrictEqual(generatedPos.line, generatedTargetLine);
  });
});
