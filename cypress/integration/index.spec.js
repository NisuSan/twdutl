/// <reference types="cypress" />



describe('Tailwind CSS Plugin Builder', () => {
  const blocksOpacities = [9, 18, 24, 36]

  beforeEach(() => {
    cy.visit('http://localhost:9000/')
  })

  it('has 1 holder container & has 4 lighted children divs', () => {
    cy.get('[data-cy=light-holder]')
      .should('have.length', 1)
      .children('[data-cy^=bg-light]')
      .should('have.length', blocksOpacities.length)
  })

  it('each <light> element has white bg with some opacity', () => {
    for (let i = 0; i < blocksOpacities.length; i++) {
      const x = blocksOpacities[i]
      cy.get(`[data-cy=bg-light-${x}]`)
        .should(
          'have.css', 
          'background-color', 
          `rgba(255, 255, 255, ${x/100})`
        )
    }
  })
})