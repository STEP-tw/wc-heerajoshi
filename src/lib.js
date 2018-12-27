const { NEWLINE, isNotEmpty, add, TAB } = require("./stringUtil.js");

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
  let content = fs.readFileSync(file, "utf-8");
  const counts = getCounts(content);
  options.forEach(option => {
    fileDetails[option] = counts[option];
  });
  return fileDetails;
};

const formatOutput = function(fileDetails) {
  const isNumber = x => !isNaN(x);
  const { lines, words, chars, name } = fileDetails[0];
  let output = [lines, words, chars].filter(isNumber);
  return TAB + output.join(TAB) + " " + name;
};

const wc = function(userArgs, fs) {
  const { options, files } = userArgs;
  const fileDetails = getFileDetails.bind(null, fs, options);
  let allFileDetails = files.map(fileDetails);
  return formatOutput(allFileDetails);
};
module.exports = { wc };
