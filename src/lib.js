const wc = function(file, fs) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  const lineCount = lines.length - 1;
  const wordsCount = lines
    .map(line => line.split(" ").filter(word => word != "").length)
    .reduce((a, b) => a + b, 0);
  const characterCount = content.split("").length;
  return (
    "\t" + lineCount + "\t" + wordsCount + "\t" + characterCount + " " + file
  );
};

module.exports = { wc };
