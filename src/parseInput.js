const isOption = x => x.startsWith("-");

const optionType = function(option) {
  const optionValue = {
    l: "lines",
    w: "words",
    c: "chars"
  };
  return optionValue[option];
};

const splitOptions = function(options) {
  return options.slice(1).split("");
};

const concat = (list1, list2) => list1.concat(list2);

const concatOption = function(matrix) {
  return matrix.reduce(concat);
};

const parseOptions = function(optionArgs) {
  let parsedOptions = optionArgs.map(splitOptions);
  parsedOptions = concatOption(parsedOptions);
  return parsedOptions.map(optionType);
};

const parser = function(args) {
  const firstArg = args[0];
  let files = args;
  let options = ["lines", "words", "chars"];
  if (isOption(firstArg)) {
    let optionArgs = args.filter(isOption);
    options = parseOptions(optionArgs);
    let fileNameIndex = optionArgs.length;
    files = args.slice(fileNameIndex);
  }
  return { options, files };
};

module.exports = { parser };
