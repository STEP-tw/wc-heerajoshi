const assert = require("assert");
const { wc } = require("../src/lib.js");

const createFileSystem = function(files) {
  return {
    readFileSync: function(filename, encoding) {
      return files[filename];
    }
  };
};

describe("wc", function() {
  const files = {
    file: "1\n2\n3\n4\n5\n",
    fileWithSpace: "1\n2  \n3  \n4\n5\n",
    file1: "one\ntwo\nthree"
  };
  const fs = createFileSystem(files);
  it("should return line,  word and character count with filename for single file", function() {
    let expected = "\t5\t5\t10 file";
    let userArg = { options: ["lines", "words", "chars"], files: ["file"] };
    assert.equal(wc(userArg, fs), expected);
  });

  it("should handle default arguments for a single file", function() {
    let expected = "\t5\t5\t14 fileWithSpace";
    let userArg = {
      options: ["lines", "words", "chars"],
      files: ["fileWithSpace"]
    };
    assert.equal(wc(userArg, fs), expected);
  });
  it("should handle if option is -l for single file ", function() {
    let expected = "\t5 fileWithSpace";
    let userArg = { options: ["lines"], files: ["fileWithSpace"] };
    assert.equal(wc(userArg, fs), expected);
  });
  it("should handle if option is -w for single file ", function() {
    let expected = "\t5 fileWithSpace";
    let userArg = { options: ["words"], files: ["fileWithSpace"] };
    assert.equal(wc(userArg, fs), expected);
  });
  it("should handle if option is -c for single file ", function() {
    let expected = "\t14 fileWithSpace";
    let userArg = { options: ["chars"], files: ["fileWithSpace"] };
    assert.equal(wc(userArg, fs), expected);
  });
  it("should return counts based on given options when a single file and two options together is given ", function() {
    let userArg = { options: ["lines", "words"], files: ["fileWithSpace"] };
    const expectedOutput = "\t5\t5 fileWithSpace";
    assert.equal(wc(userArg, fs), expectedOutput);
  });

  it("should return counts based on given options when a single file and multiple options together is given ", function() {
    let userArg = { options: ["words", "lines", "chars"], files: ["file1"] };
    const expectedOutput = "\t2\t3\t13 file1";
    assert.equal(wc(userArg, fs), expectedOutput);
  });

  it("should return  counts based on given options and fileName when multiple options in different order", function() {
    let userArg = { options: ["lines", "chars", "words"], files: ["file1"] };
    const expectedOutput = "\t2\t3\t13 file1";
    assert.equal(wc(userArg, fs), expectedOutput);
  });

  it("should return byte count for multiple files", function() {
    let actualOutput = wc({ options: ["chars"], files: ["file", "file1"] }, fs);
    let expectedOutput = "\t10 file\n\t13 file1\n\t23 total";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return word and line count for multiple files when options are given seperately", function() {
    let actualOutput = wc(
      { options: ["words", "lines"], files: ["file", "file1"] },
      fs
    );
    let expectedOutput = "\t5\t5 file\n\t2\t3 file1\n\t7\t8 total";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return byte and line count for multiple files when options are given together", function() {
    let actualOutput = wc(
      { options: ["chars", "lines"], files: ["file", "file1"] },
      fs
    );
    let expectedOutput = "\t5\t10 file\n\t2\t13 file1\n\t7\t23 total";
    assert.deepEqual(actualOutput, expectedOutput);
  });
  it("should return line count for multiple files when multiple line count option and multiple files  are given together", function() {
    let actualOutput = wc(
      { options: ["lines","lines"], files: ["file", "file1"] },
      fs
    );
    let expectedOutput = "\t5 file\n\t2 file1\n\t7 total";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
