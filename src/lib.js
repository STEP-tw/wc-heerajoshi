const TAB = "\t";
const NEWLINE = "\n";
const getLines = content => content.split(NEWLINE);
const getCharacterCount = content => content.split("").length;
const isNotEmpty = word => word != "";
const add = (a, b) => a + b;
const getLineCount = content => getLines(content).length - 1;
const getWordCount = content =>
  getLines(content)
    .map(line => line.split(" ").filter(isNotEmpty).length)
    .reduce(add, 0);

const checkOption = function(
  lineCount,
  wordCount,
  characterCount,
  file,
  option
) {
  if (option == "l") {
    return TAB + lineCount + " " + file;
  }
  if (option == "w") {
    return TAB + wordCount + " " + file;
  }
  if (option == "c") {
    return TAB + characterCount + " " + file;
  }
  return TAB + lineCount + TAB + wordCount + TAB + characterCount + " " + file;
};

const wc = function(userArgs, fs) {
  const { option, files } = userArgs;
  const content = fs.readFileSync(files[0], "utf8");
  const lineCount = getLineCount(content);
  const wordCount = getWordCount(content);
  const characterCount = getCharacterCount(content);
  const result = checkOption.bind(
    null,
    lineCount,
    wordCount,
    characterCount,
    files[0]
  );
  return result(option);
};
module.exports = { wc };
