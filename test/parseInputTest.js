const assert = require("assert");
const { parser } = require("../src/parseInput.js");
describe("parser", function() {
  it("it should return args object of option and files from given userArg", function() {
    let userArgs = ["-l", "file1"];
    assert.deepEqual(parser(userArgs), { options: ["lines"], files: ["file1"] });
  });
  it("it should return args object of option and files if input is -c return option c", function() {
    let userArgs = ["-c", "file1"];
    assert.deepEqual(parser(userArgs), { options: ["chars"], files: ["file1"] });
  });
  it("it should return args object of option and files if input is -w return option w", function() {
    let userArgs = ["-w", "file1"];
    assert.deepEqual(parser(userArgs), { options: ["words"], files: ["file1"] });
  });
  it("it should return args object of option and files if input have no option it option is defult", function() {
    let userArgs = [ "file1"];
    assert.deepEqual(parser(userArgs), { options: ["lines","words","chars"], files: ["file1"] });
  });
 
  it("should return given options and fileName when options and file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      files: ["file"]
    };
    assert.deepEqual(parser(["-lw", "file"]), expectedOutput);
  });

  it("should return given options and fileName when multiple options  given seperately  and file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      files: ["file"]
    };
    assert.deepEqual(parser(["-l", "-w", "file"]), expectedOutput);
  });
  it("should return given options and fileNames when multiple options  given seperately  and file names are given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      files: ["file1", "file2"]
    };
    assert.deepEqual(parser(["-l", "-w", "file1", "file2"]), expectedOutput);
  });
});
