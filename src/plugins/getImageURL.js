export const getImageURL = {
  install(app) {
    app.config.globalProperties.getImageURL = function (imageName) {
      return new URL(`../assets/images/${imageName}`, import.meta.url).href;
    };
  },
};
