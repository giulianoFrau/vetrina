import { faker } from "@faker-js/faker";
import { OrganizationFactory, UserLoginFactory } from "../../factories";

Cypress.Commands.add("login", (options = {}) => {
  let { userResponse, organizations } = options;
  const username = faker.internet.email();

  if (!userResponse) {
    userResponse = UserLoginFactory.create(1);
  }

  if (!organizations) {
    const orgCount = faker.datatype.number({ min: 1, max: 5 });

    organizations = [
      OrganizationFactory.state("default").create(1),
      ...OrganizationFactory.create(orgCount, () => ({ DEF: "N" }), {
        forceArray: true,
      }),
    ];

    userResponse.org_id = organizations.find(({ DEF }) => DEF === "Y")?.ORG_ID;
  }

  const localStorageState = {
    ...userResponse,
    organizations,
  };

  localStorage.setItem("auth", JSON.stringify(localStorageState));

  cy.log(`Login as ${username}`);

  cy.intercept("POST", "/users/user_login.php?*", {
    body: JSON.stringify({ result: "OK" }),
  })
    .as("userLoginRequest")
    .intercept("POST", "/users/validate_token.php?*", {
      body: JSON.stringify({ result: "OK" }),
    })
    .as("validateTokenRequest");

  return cy;
});

Cypress.Commands.add("logout", () => {
  localStorage.removeItem("auth");
});

Cypress.Commands.add("fillLoginForm", (formSelector, credentials) => {
  return cy.get(formSelector).within(() => {
    cy.get("input[name=username]")
      .type(credentials.username)
      .get("input[name=password]")
      .type(credentials.password);
  });
});
