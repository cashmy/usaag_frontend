/// <reference types="cypress" />

describe("Initial test suite", () => {

    it('First Test', () => {
        cy.visit('/')
        cy.contains('Templates').click()
    })
})