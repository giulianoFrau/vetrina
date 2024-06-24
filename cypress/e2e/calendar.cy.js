const { UserLoginFactory } = require("../factories");

describe("Calendar Page", () => {
  context("Recurring Event", () => {
    const userResponse = UserLoginFactory.state("operatore").create();

    beforeEach(() => {
      cy.intercept("POST", "/agenda/*", {
        body: JSON.stringify({ result: "OK" }),
      });

      cy.login({ userResponse });
    });

    it("should show the 'recurring event' button if is the user's calendar", () => {
      cy.visit("#/calendar")
        .get("[data-cy=create-recurrent-event-button]")
        .should("be.visible");
    });

    it("should not show the 'recurring event' button if is not the user's calendar", () => {
      cy.visit("#/calendar?user=random.user@mail.com")
        .get("[data-cy=create-recurrent-event-button]")
        .should("not.exist");
    });
  });
});
