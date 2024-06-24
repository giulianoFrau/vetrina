const { UserLoginFactory, OrganizationFactory } = require("../factories");
import { faker } from "@faker-js/faker";

describe("Menu Window (Sidebar)", () => {
  context("Organization Switch", () => {
    const organizations = [
      OrganizationFactory.state("default").create(),
      ...OrganizationFactory.create(faker.random.numeric(1), () => ({
        DEF: "N",
      })),
    ];

    const userResponse = UserLoginFactory.state("manager").create(1, () => ({
      org_id: organizations[0].ORG_ID,
    }));

    beforeEach(() => {
      const responseStub = {
        body: JSON.stringify({ result: "OK", response: [] }),
      };

      cy.intercept("POST", "/agenda/*", responseStub);
      cy.intercept("POST", "/users/get_*", responseStub);
      cy.intercept("GET", "/users/get_*", responseStub);

      cy.login({ userResponse, organizations });
    });
    it("the organization switch component should be visible", () => {
      cy.visit("/")
        .get("[data-cy=settings-toggle-btn]")
        .click()
        .get("[data-cy=settings-sidebar]")
        .find("[data-cy=org-switch]")
        .should("be.visible");
    });

    it("should update the default organization correctly", () => {
      const newDefaultOrg = faker.helpers.arrayElement(
        organizations.filter((item) => userResponse.org_id !== item.ORG_ID)
      );

      cy.intercept("POST", "/users/update_user_default_org_id*", {
        body: JSON.stringify({ result: "OK" }),
      })
        .as("updateDefaultOrgRequest")
        .visit("/")
        .get("[data-cy=settings-toggle-btn]")
        .click()
        .get("[data-cy=org-switch]")
        .within(() => {
          cy.get("select")
            .select(newDefaultOrg.ORG_NAME)
            .get("button")
            .click()
            .wait("@updateDefaultOrgRequest")
            .its("request")
            .then((request) => {
              const url = new URL(request.url);
              const orgIdParam = url.searchParams.get("v_i_org_id");
              const userIdParam = url.searchParams.get("v_i_user_id");

              expect(Number(orgIdParam)).to.equal(newDefaultOrg.ORG_ID);
              expect(userIdParam).to.equal(userResponse.user_id);
            });
        });
    });
  });
});
