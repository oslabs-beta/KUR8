describe('Custom Page', () => {
  it('Gets and asserts', () => {
    cy.visit('http://localhost:3068/')

    cy.contains('Custom').click()

    cy.url().should('include', '/custom')

    // cy.contains('Add New Chart').click()
  })
})

