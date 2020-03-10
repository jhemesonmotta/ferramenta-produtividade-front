describe('Testa Login', function() {
    it('Cenário 1', function() {
      cy.visit('http://localhost:4200');
      cy.contains('Welcome to plataforma-produtividade');
    });
  });
  