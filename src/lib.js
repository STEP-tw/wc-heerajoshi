const { NEWLINE, isNotEmpty, add } = require("./stringUtil.js");
const { formatOutput } = require("./formatOutput.js");

const getLines = content => content.split(NEWLINE);
const getCharacterCount = content => content.split("").length;
const getLineCount = content => getLines(content).length - 1;
const getWordCount = content =>
  getLines(content)
    .map(line => line.split(" ").filter(isNotEmpty).length)
    .reduce(add);

const getCounts = function(content) {
  return {
    lines: getLineCount(content),
    words: getWordCount(content),
    chars: getCharacterCount(content)
  };
};

const getFileDetails = function(fs, options, file) {
  let fileDetails = { name: file };
  const content = fs.readFileSync(file, "utf-8");
  const counts = getCounts(content);
  options.forEach(option => {
    fileDetails[option] = counts[option];
  });
  return fileDetails;
};

const addFileDetails = function(file1Details, file2Details) {
  let lines = file1Details.lines + file2Details.lines;
  let words = file1Details.words + file2Details.words;
  let chars = file1Details.chars + file2Details.chars;
  let name = "total";
  return { name, lines, words, chars };
};

const getTotalCounts = function(fileDetailsObjects) {
  let totalObject = { lines: 0, words: 0, chars: 0 };
  return fileDetailsObjects.reduce(addFileDetails, totalObject);
};

const wc = function(userArgs, fs) {
  const { options, files } = userArgs;
  const fileDetails = getFileDetails.bind(null, fs, options);
  let allFileDetails = files.map(fileDetails);
  if (files.length > 1) {
    let totalCountObject = getTotalCounts(allFileDetails);
    allFileDetails.push(totalCountObject);
  }
  return allFileDetails.map(formatOutput).join("\n");
};
module.exports = { wc };
