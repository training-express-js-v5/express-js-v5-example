exports.pascalCaseToSnakeCase = string => {
  const firstLetter = string[0].toLowerCase();
  const rest = string.slice(1).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  return `${firstLetter}${rest}`;
};
