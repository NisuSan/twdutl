/// <reference types="cypress" />

describe('Light background color based on white color with opacity:', () => {
  const blocksOpacities = [9, 18, 24, 36]

  beforeEach(() => {
    cy.visit('http://localhost:9000/')
  })

  it('should has 1 holder container and has 4 children divs', () => {
    cy.get('[data-cy=light-holder]')
      .should('have.length', 1)
      .children('[data-cy^=bg-light]')
      .should('have.length', blocksOpacities.length)
  })

  it('each child element has white bg with some opacity', () => {
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