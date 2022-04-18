describe("User can sign up", () => {
  it("User auth works", () => {
    cy.visit("/");
    cy.findByText(/get started/i).click();
    cy.findByLabelText("Name").type("Daniel Smith");
    cy.findByLabelText("Username").type("danny");
    cy.findByText(/create/i).click();
  });

  it("Create profile works", () => {
    cy.contains("label", "Profile picture url").type(
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
    );
    cy.findByLabelText(/location/i).type("Redwood City, CA");
    cy.findByLabelText(/career/i).type("Analyst at Grammarly");
    cy.findByLabelText(/bio/i).type(
      "Leo urna molestie at elementum eu facilisis sed."
    );
    cy.findByText(/create user/i).click();
  });

  it("Can delete profile", () => {
    cy.contains("button", "Account").click();
    cy.contains("button", "Delete").click();
    cy.contains("button", "Delete account").click({ force: true });
    cy.contains("Get started");
  });
});
