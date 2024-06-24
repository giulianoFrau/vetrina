const { UserLoginFactory } = require("../factories");

describe("Navbar Component", () => {
  beforeEach(() => {
    const stubResponse = {
      body: JSON.stringify({ result: "OK", response: [] }),
    };
    cy.intercept("GET", "/maps/*", {}).as("gmapRequests");
    cy.intercept("POST", "/agenda/*", stubResponse).as("postAgendaRequests");
    cy.intercept("GET", "/users/*", stubResponse).as("getUserRequests");
    cy.intercept("POST", "/users/*", stubResponse).as("postUserRequests");
  });

  it("user with role 'OPERATORE' should not see any links", () => {
    const userResponse = UserLoginFactory.state("operatore").create();

    cy.login({ userResponse })
      .visit("/")
      .wait("@gmapRequests")
      .get("[data-cy=navbar] [data-cy=navbar-links] .nav-item")
      .should("have.length", 0);
  });

  it("user with role 'AGENTE' should not see any links ", () => {
    const userResponse = UserLoginFactory.state("agente").create();

    cy.login({ userResponse })
      .visit("/")
      .wait("@postAgendaRequests")
      .get("[data-cy=navbar] [data-cy=navbar-links] .nav-item")
      .should("have.length", 0);
  });

  it("user with role 'SUPER_USER' should see 'ManageUsers' and 'CalendarPage' links", () => {
    const userResponse = UserLoginFactory.state("manager").create();

    cy.login({ userResponse })
      .visit("/")
      .wait("@postAgendaRequests")
      .get("[data-cy=navbar] [data-cy=navbar-links] .nav-item")
      .as("navItems")
      .should("have.length", 2)
      .eq(0)
      .should("have.attr", "href", "#/calendar")
      .get("@navItems")
      .eq(1)
      .should("have.attr", "href", "#/manage-users");
  });
});
