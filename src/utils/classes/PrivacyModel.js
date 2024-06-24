export default class PrivacyModel {
  constructor(config = {}) {
    const {
      name,
      htmlTemplate = "",
      required = false,
      isChildren = false,
      parent,
    } = config;

    this.name = name;
    this.htmlTemplate = htmlTemplate;
    this.required = required;
    this.isChildren = isChildren;
    this.children = [];
    this.parent = parent;
  }

  addChildren(childModel) {
    childModel.parent = this;
    this.children.push(childModel);
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  flatten() {
    return [this, ...this.children];
  }

  getValidations() {
    const required = (value) => Boolean(value);

    return this.flatten().reduce((obj, el) => {
      const validations = {};

      if (el.required) {
        validations.required = required;
      }

      if (Object.keys(validations).length > 0) {
        obj[el.name] = validations;
      }

      return obj;
    }, {});
  }

  getTemplate(name = "") {
    if (["", this.name].includes(name)) {
      return this.htmlTemplate;
    } else {
      return this.children.find((model) => model.name === name).htmlTemplate;
    }
  }

  getTemplateToText(name = "") {
    const el = document.createElement("div");
    el.innerHTML = this.getTemplate(name);

    return el.textContent;
  }
}