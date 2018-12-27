const { TAB } = require("./stringUtil.js");
const formatOutput = function(fileDetails) {
  const isNumber = x => !isNaN(x);
  const { lines, words, chars, name } = fileDetails[0];
  let output = [lines, words, chars].filter(isNumber);
  return TAB + output.join(TAB) + " " + name;
};

module.exports = { formatOutput };
