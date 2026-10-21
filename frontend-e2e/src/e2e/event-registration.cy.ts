describe('Cadastro de Eventos (/event/new)', () => {
  it('deve preencher e submeter o formulário de cadastro de evento com sucesso', () => {
    // Interceptar a chamada POST para a API de eventos
    cy.intercept('POST', '**/api/event*', {
      statusCode: 201,
      body: {
        id: 'mock-event-id',
        name: 'Tech Conference 2026',
        address: 'Av. Paulista, 1000 - São Paulo, SP',
        capacity: 500,
        date: '2026-11-20',
      },
    }).as('createEventRequest');

    // Visitar a página de cadastro de evento
    cy.visit('/event/new');

    // Preencher campos obrigatórios utilizando seletores CSS convencionais
    cy.get('#event-name').type('Tech Conference 2026');
    cy.get('#event-address').type('Av. Paulista, 1000 - São Paulo, SP');
    cy.get('#event-capacity').type('500');
    cy.get('#event-date').type('2026-11-20');

    // Submeter através do botão de envio
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // Aguardar a resposta da requisição interceptada
    cy.wait('@createEventRequest');

    // Verificar exibição da mensagem de sucesso
    cy.get('#event-form-success')
      .should('be.visible')
      .and('contain.text', 'Local do evento cadastrado com sucesso!');
  });

  it('deve exibir mensagens de erro para todos os campos obrigatórios ao submeter formulário vazio', () => {
    // Visitar a página de cadastro de evento
    cy.visit('/event/new');

    // Submeter o formulário vazio disparando submit direto no form
    cy.get('form').submit();

    // Validar mensagens de erro nativas com asserções tradicionais do Cypress
    cy.get('#event-name-error')
      .should('be.visible')
      .and('contain.text', 'O nome do evento é obrigatório');

    cy.get('#event-address-error')
      .should('be.visible')
      .and('contain.text', 'O endereço é obrigatório');

    cy.get('#event-capacity-error')
      .should('be.visible')
      .and('contain.text', 'A capacidade é obrigatória');

    cy.get('#event-date-error')
      .should('be.visible')
      .and('contain.text', 'A data do evento é obrigatória');
  });
});
