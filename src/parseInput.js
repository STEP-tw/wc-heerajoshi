const parser = function(userArgs) {
  let result = {
    option: "lwc",
    files: userArgs.slice(0)
  };
  if (userArgs[0].startsWith("-") && !userArgs[1].startsWith("-")) {
    result.option = userArgs[0].slice(1);
    result.files = userArgs.slice(1);
  }
  return result;
};

module.exports = { parser };
