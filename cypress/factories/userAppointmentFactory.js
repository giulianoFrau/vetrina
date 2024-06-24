import { faker } from "@faker-js/faker/locale/it";
import { defineFactory } from "@federico.mameli/js-factory";
import { startOfWeek, endOfWeek, format, addHours } from "date-fns";

export const UserAppointment = defineFactory(() => {
  const EMAIL = faker.internet.email();
  const CREATED_BY_USER_ID = faker.internet.email();

  const now = Date.now();
  const FROM_DATE = faker.date
    .between(startOfWeek(now), endOfWeek(now))
    .setHours(faker.datatype.number({ min: 8, max: 18 }));
  const TO_DATE = addHours(
    FROM_DATE,
    faker.datatype.number({ min: 1, max: 3 })
  );

  return {
    USER_ID: EMAIL,
    H_LEV: "1",
    PARENT_ID: null,
    NAME: faker.name.firstName(),
    LAST_NAME: faker.name.lastName(),
    BUSINESS_NAME: faker.company.name(),
    EMAIL,
    CONTACT_NUMBER: faker.phone.number(),
    STATUS: "ACTIVE",
    ORG_NAME: faker.company.name(),
    APPOINTMENT_ID: faker.datatype.number(),
    FROM_DATE: format(FROM_DATE, "yyyy-MM-dd HH:mm:ss"),
    TO_DATE: format(TO_DATE, "yyyy-MM-dd HH:mm:ss"),
    APPOINTMENT_TYPE: "STANDARD",
    USER_RESERV_ID: null,
    RESERV_DESCRIPTION: null,
    USER_CONFIRM_DTM: null,
    CONTACT_NAME: faker.name.fullName(),
    CONTACT_BUSINESS_NAME: faker.name.fullName(),
    CONTACT_EMAIL: faker.internet.email(),
    CONTACT_ADDRESS: "Via Roma, 21",
    CONTACT_CITY: "Cagliari",
    CONTACT_ZIPCODE: "09125",
    CONTACT_COUNTRY: "Cagliari",
    CONTACT_GEO_LAT: 39.216422688808,
    CONTACT_GEO_LON: 9.108608462635866,
    NOTE: null,
    CREATED: faker.date.soon(0, Date.now()),
    LAST_UPDATE: faker.date.soon(0, Date.now()),
    CREATED_BY_USER_ID,
    LAST_UPDATE_BY_USER_ID: CREATED_BY_USER_ID,
  };
}).get();
