import { defineFactory } from "@federico.mameli/js-factory";
import { faker } from "@faker-js/faker";

const roles = ["SUPER_USER", "AGENTE", "OPERATORE"];

export const UserLoginFactory = defineFactory(() => ({
  user_role: faker.helpers.arrayElement(roles),
  user_id: faker.internet.email(),
  user_name: faker.name.fullName(),
  org_id: 100,
  token: faker.datatype.uuid(),
}))
  .defineState("manager", () => ({ user_role: "SUPER_USER" }))
  .defineState("agente", () => ({ user_role: "AGENTE" }))
  .defineState("operatore", () => ({ user_role: "OPERATORE" }))
  .get();

export const UserFactory = defineFactory(() => {
  const EMAIL = faker.internet.email();

  return {
    ORG_ID: faker.datatype.number({ min: 100, max: 1000 }),
    ORG_NAME: faker.company.name(),
    role: faker.helpers.arrayElement(roles),
    USER_ID: EMAIL,
    NAME: faker.name.firstName(),
    LAST_NAME: faker.name.lastName(),
    EMAIL,
    CONTACT_NUMBER: faker.phone.number(),
    STATUS: "ACTIVE",
    VISIBLE: faker.helpers.arrayElement(["Y", "N"]),
    RANGE_KM: faker.datatype.number({ min: 1, max: 50 }),
    ADDRESS: `${faker.address.street()} ${faker.address.buildingNumber()}`,
    CITY: faker.address.city(),
    ZIP_CODE: faker.address.zipCode(),
    COUNTRY: faker.address.country(),
    GEO_LATITUDE: faker.address.latitude(),
    GEO_LONGITUDE: faker.address.longitude(),
  };
}).get();

export const AgentFactory = defineFactory(() => {
  const EMAIL = faker.internet.email();

  return {
    USER_ID: EMAIL,
    PARENT_ID: null,
    NAME: faker.name.firstName(),
    LAST_NAME: faker.name.lastName(),
    EMAIL,
    CONTACT_NUMBER: faker.phone.number(),
    RANGE_KM: faker.datatype.number({ min: 1, max: 100 }),
    ADDRESS: "Via Roma, 21",
    CITY: "Cagliari",
    ZIP_CODE: "09125",
    COUNTRY: "Cagliari",
    GEO_LATITUDE: "39.216422688808",
    GEO_LONGITUDE: "9.108608462635866",
  };
}).get();
