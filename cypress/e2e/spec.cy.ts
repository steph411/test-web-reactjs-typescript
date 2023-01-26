describe('app lunch', () => {
    it('passes', () => {
        cy.visit('localhost:3000')
        cy.get('h1').should('have.text', 'test-web-reactjs-typescript');

        cy.contains('Ajouter').click();

        cy.get('#input_title').type('Post de test');
        cy.get('#input_description').type('Description text');

        cy.contains('Envoyer').click();

        cy.get('.post').first().click();
        cy.get('#comment_input').type('Commentaire de test');
        cy.get('#add_comment_btn').click();
        cy.get('.comment-content').should('have.text', 'Commentaire de test');

    })
})