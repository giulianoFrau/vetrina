export const getNameInitials = (fullName) => {
  let name = fullName.split(" ");
  return name.length == 1
    ? name[0].slice(0, 2)
    : `${[...name[0]][0]}${[...name[name.length - 1]][0]}`;
};
