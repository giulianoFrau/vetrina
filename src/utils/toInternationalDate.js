export const toInternationalDate = (date) => {
  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2];
  return `${month}/${day}/${year}`;
};
