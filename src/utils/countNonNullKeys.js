export function countNonNullKeys(obj, regexPattern) {
  let count = 0;
  const regex = new RegExp(regexPattern);

  for (let key in obj) {
    if (regex.test(key) && obj[key] !== null) {
      count++;
    }
  }

  return count;
}
