import { faker } from "@faker-js/faker";
import { UserLoginFactory } from "../factories";

describe("Login Page", () => {
  const credentials = {
    username: faker.internet.email(),
    password: "1234Password",
  };

  const stubResponse = { body: JSON.stringify({ result: "OK", response: [] }) };

  const createLoginResponse = (role) => {
    const user = UserLoginFactory.state(role).create();
    return {
      result: "OK",
      token: user.token,
      roles: [
        {
          NAME: user.user_name.split(" ")[0],
          LAST_NAME: user.user_name.split(" ")[1],
          ROLE_NAME: user.user_role,
          ORG_ID: user.org_id,
        },
      ],
    };
  };

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept("GET", "/maps/api/*", {});
    cy.intercept("POST", "/agenda/*", stubResponse);
    cy.intercept("POST", "/users/*", stubResponse);
    cy.intercept("GET", "/users/*", stubResponse);
  });

  it("if user has 'operatore' role, should log successfully and redirect to '/search-map' route", () => {
    const loginResponse = createLoginResponse("operatore");

    cy.visit("#/account/login")
      .intercept("POST", "/users/user_login.php*", {
        body: JSON.stringify(loginResponse),
      })
      .as("loginReq")
      .fillLoginForm("[data-cy=login-form]", credentials)
      .find("button[type=submit]")
      .click()
      .wait("@loginReq")
      .its("request")
      .then((request) => {
        const url = new URL(request.url);
        const { username, password } = credentials;
        expect(url.searchParams.get("v_i_user_id")).to.equal(username);
        expect(url.searchParams.get("v_i_pwd")).to.equal(password);
      })
      .url()
      .should("contain", "#/search-map");
  });

  it("if user has 'agente' role, should log successfully and redirect to '/calendar' route", () => {
    const loginResponse = createLoginResponse("agente");

    cy.visit("#/account/login")
      .intercept("POST", "/users/user_login.php?*", {
        body: JSON.stringify(loginResponse),
      })
      .as("loginReq")
      .fillLoginForm("[data-cy=login-form]", credentials)
      .find("button[type=submit]")
      .click()
      .wait("@loginReq")
      .its("request")
      .then((request) => {
        const url = new URL(request.url);
        const { username, password } = credentials;
        expect(url.searchParams.get("v_i_user_id")).to.equal(username);
        expect(url.searchParams.get("v_i_pwd")).to.equal(password);
      })
      .url()
      .should("contain", "#/calendar");
  });

  it("if user has 'super_user' role, should log successfully and redirect to '/manage-users' route", () => {
    const loginResponse = createLoginResponse("manager");

    cy.visit("#/account/login")
      .intercept("POST", "/users/user_login.php?*", {
        body: JSON.stringify(loginResponse),
      })
      .as("loginReq")
      .fillLoginForm("[data-cy=login-form]", credentials)
      .find("button[type=submit]")
      .click()
      .wait("@loginReq")
      .its("request")
      .then((request) => {
        const url = new URL(request.url);
        const { username, password } = credentials;
        expect(url.searchParams.get("v_i_user_id")).to.equal(username);
        expect(url.searchParams.get("v_i_pwd")).to.equal(password);
      })
      .url()
      .should("contain", "#/manage-users");
  });

  context("User already Logged In", () => {
    it("should redirect to user's home page if tries to access login page", () => {
      const userResponse = UserLoginFactory.state("manager").create();
      cy.login({ userResponse })
        .visit("#/account/login")
        .url()
        .should("contain", "#/manage-users");
    });

    it("should redirect to login page if token is not valid", () => {
      const invalidTokenStubResponse = {
        body: JSON.stringify({ result: "ERR", result_msg: "Token expired" }),
      };

      cy.on("uncaught:exception", () => false); //ignore the exception

      cy.intercept(
        "POST",
        "/agenda/get_user_diary*",
        invalidTokenStubResponse
      ).as("invalidTokenRequest");

      cy.login()
        .visit("/")
        .wait("@invalidTokenRequest")
        .then(() => {
          cy.url().should("contain", "#/account/login");

          cy.wrap(JSON.parse(localStorage.getItem("auth")))
            .its("token")
            .should("be.null");
        });
    });
  });
});
