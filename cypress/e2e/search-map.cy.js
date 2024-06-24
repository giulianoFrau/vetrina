import { faker } from "@faker-js/faker";
import { sortBy } from "lodash-es/collection";
import {
  AgentFactory,
  UserAppointment,
  UserFactory,
  UserLoginFactory,
} from "../factories";

const stubResponse = {
  body: JSON.stringify({ result: "OK", response: [] }),
};

describe("Search Map View", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept("POST", "/agenda/*", {
      body: JSON.stringify({ result: "OK" }),
    });
    cy.intercept("POST", "/users/*", {
      body: JSON.stringify({ result: "OK" }),
    });
  });

  context("User with agente role", () => {
    beforeEach(() => {
      const userResponse = UserLoginFactory.state("agente").create();
      cy.login({ userResponse });
    });

    it('user with "AGENTE" role should not have access to the page', () => {
      cy.visit("#/search-map").url().should("contain", "#/calendar");
    });
  });

  context("User with 'manager' role", () => {
    //TODO: split page tests
    beforeEach(() => {
      const userResponse = UserLoginFactory.state("manager").create();
      cy.login({ userResponse });
    });

    it.only("Can modify the event assignee", () => {
      /**
       * Flow starts from manage-users page.
       * The user should click on a calendar button and should be redirect to the selected user's calendar.
       * From here, he can select the event and change the assignee from the edit modal
       * by clicking the "change assignee" button, which will redirect to the search-map page.
       * From this page the manager can select the users available in the event's location.
       * When click on user card, should be shown a modal for the confirmation to change the assignee.
       * In case the new assignee has already a event between the event time range,
       * the manager will be notified and should select a new user
       */
      const users = sortBy(UserFactory.create(10), ({ NAME }) => NAME);
      const selectedUserIndex = faker.datatype.number({
        min: 0,
        max: users.length - 1,
      });
      const selectedUser = users[selectedUserIndex];
      const appointments = UserAppointment.create(3, () => ({
        ...selectedUser,
      }));

      const selectedAppointmentIndex = faker.datatype.number({
        min: 0,
        max: appointments.length - 1,
      });

      const selectedAppointment = appointments[selectedAppointmentIndex];
      const selectedAppointmentFullAddress = [
        selectedAppointment.CONTACT_ADDRESS,
        selectedAppointment.CONTACT_CITY,
      ].join(" ");

      const agents = AgentFactory.create(
        faker.datatype.number({ min: 1, max: 10 })
      );

      const selectedAgentIndex = faker.datatype.number({
        max: agents.length - 1,
      });

      const selectedAgent = agents[selectedAgentIndex];

      cy.intercept("GET", "/users/get_roles.php?*", stubResponse);
      cy.intercept("POST", "/users/get_org_users.php?*", {
        body: JSON.stringify({
          result: "OK",
          response: users,
        }),
      }).as("getUsersRequest");

      cy.intercept("POST", "/agenda/get_user_appointments.php?*", {
        body: JSON.stringify({
          result: "OK",
          response: appointments,
        }),
      }).as("getUserAppointmentsRequest");

      cy.intercept("POST", "/users/get_users_address_by_geopos.php?*", {
        body: JSON.stringify({
          result: "OK",
          response: agents,
        }),
      }).as("getAvailableAgentsRequest");

      cy.intercept("POST", "/agenda/reassign_appointment.php?*", {
        body: JSON.stringify({ result: "OK" }),
      }).as("changeAppointmentAssignee");

      cy.visit("#/manage-users")
        .wait("@getUsersRequest")
        .get("[data-cy=users-list] .user-card")
        .eq(selectedUserIndex)
        .find("[data-cy=go-to-calendar-btn]")
        .click()
        .url()
        .should("contain", `user=${selectedUser.USER_ID}`)
        .wait("@getUserAppointmentsRequest")
        .get(".vuecal .vuecal__event")
        .eq(selectedAppointmentIndex)
        .click({ force: true })
        .get("#createEventForm.modal")
        .should("be.visible")
        .find("#event-form button[data-cy=edit-event-assignee-btn]")
        .click()
        .url()
        .should("contain", "#/search-map")
        .wait("@getAvailableAgentsRequest")
        .get("[data-cy=gmap-input]")
        .should("have.value", selectedAppointmentFullAddress)
        .get("[data-cy=available-agents] .card")
        .should("have.length", agents.length)
        .eq(selectedAgentIndex)
        .click({ force: true })
        .get("[data-cy=change-event-assignee-modal].modal")
        .should("be.visible")
        .find("button[data-cy=confirm-btn]")
        .click()
        .wait("@changeAppointmentAssignee")
        .its("request")
        .then((request) => {
          const url = new URL(request.url);
          const params = url.searchParams;
          const APPOINTMENT_ID = String(selectedAppointment.APPOINTMENT_ID);
          const USER_ID = String(selectedAgent.USER_ID);

          expect(params.get("v_i_new_user_id")).to.equal(USER_ID);
          expect(params.get("v_i_appointment_id")).to.equal(APPOINTMENT_ID);
        })
        .url()
        .should("contain", "#/calendar")
        .and("contain", `user=${selectedAgent.USER_ID}`);
    });
  });
});
