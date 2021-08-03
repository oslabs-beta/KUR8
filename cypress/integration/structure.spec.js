describe('Structure Page', () => {
  it('Gets and asserts', () => {
    cy.visit('http://localhost:3068/');

    // cy.intercept('GET', '/api/v1/**', {
    //   statusCode: 201,
    //   body: {
    //     metrics: 'yes',
    //   },
    // })

    cy.contains('Next').parent().click();
    cy.wait(200);
    cy.contains('Next').parent().click();
    cy.wait(200);
    cy.contains('Next').parent().click();
    cy.wait(200);
    cy.contains('Finish').parent().click();

    cy.url().should('include', '/structure');

    cy.contains('Structure').click();

    cy.url().should('include', '/structure');

    cy.contains('Cluster Environment');

    cy.get('[id^=Node]').each(($Node, index) => {
      cy.get(`#Node${index}`).children().first().click();
      cy.contains('Close').should('be.visible')
      cy.contains('Close').click();
    });

    cy.get('[id^=Master]').each(($Master, index) => {
      cy.get(`#Master${index}`).children().first().click();
      cy.contains('Close').should('be.visible')
      cy.contains('Close').click();
    });
  });
});
