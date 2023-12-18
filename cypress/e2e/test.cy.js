describe('Registration, Login, and Public Chat', () => {
  it('successfully registers a new user, logs in, and interacts with public chat', () => {
    // Visit the registration page
    cy.visit('http://localhost:3000/register');

    // Fill in the registration form
    cy.get('input[name="username"]').type('cypress');
    cy.get('input[name="fullname"]').type('cypress');
    cy.get('input[name="email"]').type('cypress@example.com');
    cy.get('input[name="password"]').type('cypress'); 

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Assert that the registration was successful
    cy.get('.alert-success').should('be.visible');

    // Click on the login link
    cy.get('a[href="/login"]').click();

    // Fill in the login form
    cy.get('input[name="username"]').type('cypress');
    cy.get('input[name="password"]').type('cypress'); 

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Assert that the login was successful
    cy.url().should('eq', 'http://localhost:3000/profile');

    // Navigate to the public chat
    cy.get('a[href="/public-chat"]').click();  
    
    // Enter a nickname in the public chat
    cy.get('input[placeholder="Vul je bijnaam in"]').type('naam');

    // Type a message in the public chat
    cy.get('input[placeholder="Typ een bericht"]').type('mijn bericht die iedereen kan zien als die ingelogd is.');

    // Click on the send button
    cy.get('button:contains("send")').click();

    // Assert that the message is visible in the public chat
    cy.contains('mijn bericht die iedereen kan zien als die ingelogd is.').should('be.visible');

    cy.get('a[href="/login"]').click();

    // Perform logout action
    cy.get('.nav-link').click();

    // Assert that the logout was successful
    cy.url().should('eq', 'http://localhost:3000/login');
  });
});
