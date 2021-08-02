describe('Structure Page', () => {
  it('Gets and asserts', () => {
    cy.visit('http://localhost:3068/')

    cy.contains('Structure').click()

    cy.url().should('include', '/structure')

    cy.contains('Node')
  })
})

