//function that takes a string, a length and a character as arguments and cuts  the string to the length  and ends the string with the character

export const cutString = {
  install(app) {
    app.config.globalProperties.cutString = (
      str,
      length = 10,
      character = "..."
    ) => {
      if (str.length <= length) {
        return str;
      } else {
        return str.slice(0, length) + character;
      }
    };
  },
};
