/// <reference types="cypress" />

describe("Initial test", () => {

    it('First Test', () => {
        cy.visit('/')
        cy.contains('Templates').click()
    })
})