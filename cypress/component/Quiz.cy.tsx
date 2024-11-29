import { mount } from '@cypress/react18'; // React 18-compatible adapter
import Quiz from '../../client/src/components/Quiz'; // Adjust based on your project structure

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mock the API response to return a valid structure
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
  });

  it('renders the quiz start button', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('exist');
  });

  it('starts the quiz when the start button is clicked and shows the first question', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Ensure the mock API call completes
    cy.contains('What is React?').should('exist');
  });
});





