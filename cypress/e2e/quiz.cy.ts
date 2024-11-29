describe('Tech Quiz E2E Test', () => {
  beforeEach(() => {
    // Mock the API response for the questions
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: [
        {
          question: 'What is React?',
          answers: [
            { text: 'A JavaScript library for building user interfaces', isCorrect: true },
            { text: 'A type of database', isCorrect: false },
            { text: 'A framework for styling', isCorrect: false },
            { text: 'None of the above', isCorrect: false },
          ],
        },
      ],
    }).as('getQuestions');

    // Visit the app's main page
    cy.visit('/');
  });

  it('allows the user to complete the quiz', () => {
    // Wait for the button to appear
    cy.get('button').contains('Start Quiz').should('be.visible').click();
  
    // Wait for the mock API call
    cy.wait('@getQuestions');
  
    // Verify the first question is rendered
    cy.contains('What is React?').should('exist');
  
    // Answer the first question
    cy.contains('A JavaScript library for building user interfaces').click();
  
    // Verify the quiz completion screen
    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score: 1/1').should('exist');
  
    // Restart the quiz
    cy.contains('Take New Quiz').click();
    cy.contains('Start Quiz').should('exist');
  });
  
});


  

  