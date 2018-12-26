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
    fileWithSpace: "1\n2  \n3  \n4\n5\n"
  };
  const fs = createFileSystem(files);
  it("should return line,  word and character count with filename for single file", function() {
    let expected = "\t5\t5\t10 file";
    let userArg = { option: "lwc", files: ["file"] };
    assert.equal(wc(userArg, fs), expected);
  });

  it("should handle default arguments for a single file", function() {
    let expected = "\t5\t5\t14 fileWithSpace";
    let userArg = { option: "lwc", files: ["fileWithSpace"] };
    assert.equal(wc(userArg, fs), expected);
  });
  it("should handle if option is -l for single file ", function() {
    let expected = "\t5 fileWithSpace";
    let userArg = { option: "l", files: ["fileWithSpace"] };
    assert.equal(wc(userArg, fs), expected);
  });
  it("should handle if option is -w for single file ", function() {
    let expected = "\t5 fileWithSpace";
    let userArg = { option: "w", files: ["fileWithSpace"] };
    assert.equal(wc(userArg, fs), expected);
  });
});
