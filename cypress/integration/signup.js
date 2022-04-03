describe("User can sign up", () => {
  it("User auth works", () => {
    cy.visit("/");
    cy.contains("Get started").click();
    cy.contains("label", "Name:").type("Daniel Smith");
    cy.contains("label", "Username:").type("danny");
    cy.contains("button", "CREATE").click();
  });

  it("Create profile works", () => {
    cy.contains("label", "Profile picture url:").type(
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
    );
    cy.contains("label", "Location:").type("Redwood City, CA");
    cy.contains("label", "Career:").type("Analyst at Grammarly");
    cy.contains("label", "Bio:").type(
      "Leo urna molestie at elementum eu facilisis sed."
    );
    cy.contains("Create user").click();
  });

  it("Can delete profile", () => {
    cy.contains("More").click();
    cy.contains("button", "Delete").click();
    cy.contains("button", "Delete account").click({ force: true });
    cy.contains("Get started");
  });
});
