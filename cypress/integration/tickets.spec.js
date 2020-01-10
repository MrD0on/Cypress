describe("Tickets", () => {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it("fills all the text input fields", () => {
        const firstName = "Ruan";
        const lastName = "Souza";
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("ruan.souza@cubos.io");
        cy.get("#requests").type("vegeterian");
        cy.get("#signature").type(`${firstName} ${lastName}`);   
    });

    it("select two tickets", () =>{
        cy.get('#ticket-quantity').select("2");
    });

    it("select vip ticket type", () =>{
        cy.get("#vip").check();
    });

    it("selects social media checkbox", () => {
        cy.get("#social-media").check();
    });

    it("Selects friends, and publication, then uncheck friends", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#social-media").uncheck();
    });

    it("has 'TICKECTBOX' header's heading", () =>{
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alert on invalid email", () =>{
        cy.get("#email")
        .as("email")
        .type("ruan.souzacubos.io");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
        .clear()
        .type("ruan.souza@cubos.io");

        cy.get("#email.invalid").should("not.exist")
    });

    it("fills and reset the form", () =>{
        const firstName = "Ruan";
        const lastName = "Souza";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("ruan.souza@cubos.io");
        cy.get('#ticket-quantity').select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("beer");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("#agree").click();
        cy.get("#signature").type(fullName)
        cy.get("button[type='submit]")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("button[type='submit']").should("be.disabled");
    });

    it.only("fills mandaroty fields using support command", () => {
        const customer = {
            firstName: "Ruan",
            lastName: "Souza",
            email: "ruan.souza@cubos.io"
        };

        cy.fillMandarotyFields(customer);

        cy.get("button[type='submit]")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("button[type='submit']").should("be.disabled");

    });
});