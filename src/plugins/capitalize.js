export const capitalize = {
  install(app) {
    app.config.globalProperties.capitalize = function (string) {
      return string
        ? string
            .split(" ")
            .map(
              (word) =>
                word.charAt(0) + word.slice(1, word.length).toLowerCase()
            )
            .join(" ")
        : "";
    };
  },
};
