describe('Custom Page', () => {
  it('Clicks through the getting started', () => {
    cy.visit('http://localhost:3068/');

    cy.contains('Next').parent().click();
    cy.wait(200);
    cy.contains('Next').parent().click();
    cy.wait(200);
    cy.contains('Next').parent().click();
    cy.wait(200);
    cy.contains('Finish').parent().click();

    cy.url().should('include', '/structure');
  });

  it('Click and route to Custom page', () => {
    cy.contains('Custom').click();

    cy.url().should('include', '/custom');
  });

  it('Clicking Add New Chart should open up query form', () => {
    cy.contains('Add New Chart').click();

    cy.get('#autocomplete-query')
      .should('be.visible')
      .type('howdy')
      .should('have.value', 'howdy');

    cy.get('#select-range').should('be.visible').click();
    cy.get('li').eq(0).click();

    cy.get('li')
      .should('have.length', 9)
      .each(($li, index, $lis) => {
        cy.get('#select-range').click();
        cy.get('li').eq(index).click();
      });

    cy.get('#select-step').should('be.visible').click();
    cy.get('li').eq(0).click();

    cy.get('li')
      .should('have.length', 5)
      .each(($li, index, $lis) => {
        cy.get('#select-step').click();
        cy.get('li').eq(index).click();
      });
  });

  it('Clicking submit with form filled out should create a custom chart', () => {
    cy.intercept('GET', '/api/v1/**', {
      statusCode: 201,
      body: {
        data: {
          result: [
            {
              values: [10, 10],
              metric: {
                __name__: 'customchart',
              },
            },
          ],
        },
      },
    });

    cy.get('#submit-custom').should('be.visible').click();
    
    cy.contains('customchart').should('exist')
  });

  it('Clicking delete should delete the custom chart', () => {
    cy.contains('delete').should('be.visible').click();
    cy.contains('customchart').should('not.exist');
    cy.contains('delete').should('not.exist');
  });
});
