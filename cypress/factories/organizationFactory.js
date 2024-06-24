import { defineFactory } from "@federico.mameli/js-factory";
import { faker } from "@faker-js/faker";

export const OrganizationFactory = defineFactory(() => {
  return {
    USER_ID: faker.internet.email(),
    ORG_ID: faker.datatype.number(),
    ORG_NAME: faker.company.name(),
    STATUS: faker.helpers.arrayElement(["ACTIVE"]),
    DEF: faker.helpers.arrayElement(["Y", "N"]),
  };
})
  .defineState("default", () => ({ DEF: "Y" }))
  .get();
