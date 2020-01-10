describe("Login", ()=>{
    beforeEach(() => cy.visit("https://dev-site.amigoedu.com.br/"));

    it("Login no sistema", () => {
        cy.get('[data-cy=signin]').click();
        cy.get('[name=email').type('ruan.souza@cubos.io');
        cy.get('[data-cy=password').type('ba260130');
        cy.get('[data-cy=submit').click();
        cy.get('[data-cy=username]').should("be.visible")
    });

})