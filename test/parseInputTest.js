const assert = require("assert");
const { parser } = require("../src/parseInput.js");
describe("parser", function() {
  it("it should return args object of option and files from given userArg", function() {
    let userArgs = ["-l", "file1"];
    assert.deepEqual(parser(userArgs), { option: "l", files: ["file1"] });
  });
});
