Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

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

    // Type a message in the public chat
    cy.get('input[placeholder="Typ een bericht"]').type('mijn bericht die iedereen kan zien als die ingelogd is.');

    // Click on the send button
    cy.get('#sendpublic').click();

    // Assert that the message is visible in the public chat
    cy.contains('mijn bericht die iedereen kan zien als die ingelogd is.').should('be.visible');
  
    // Open the user dropdown
    cy.get('button[aria-controls="user-dropdown"]').click();

    // Choose a user from the dropdown (assuming there is a "Select User to Chat" option)
    cy.get('#user-dropdown').contains('ferhat').click();

    // Type a message in the private chat
    cy.get('input[placeholder="Type a message"]').type('Hello, this is a private message');
    
    // Click on the send button for private chat
    cy.get('#sendprivate').click();

    // Assert that the sent message is visible in the private chat
    cy.contains('Hello, this is a private message').should('be.visible');

    // Click on the logout link
    cy.get('#logout-link').click();

    // Assert that the user is redirected to the login page after logout
    cy.url().should('eq', 'http://localhost:3000/login');

    // You can also assert other elements or behaviors on the login page if needed
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    // Fill in the login form as admin
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin'); 

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Assert that the login was successful
    cy.url().should('eq', 'http://localhost:3000/profile');

    // Navigate to the public chat
    cy.get('a[href="/admin"]').click();  

    // Clean public messages
    cy.get('#clean-messages-btn').click();

    // Navigate to the public-chat page
    cy.visit('http://localhost:3000/public-chat');

    // Assert that the message is not visible in the public chat
    cy.contains('mijn bericht die iedereen kan zien als die ingelogd is.').should('not.exist');

    // Navigate back to the admin page
    cy.visit('http://localhost:3000/admin');

    cy.contains('td', 'cypress')
    .parent()  // Assuming the delete button is in the same parent container as the user information
    .find('[id^="delete-user-btn"]')  
    .click();

    // Click the "Cancel" button
    cy.get('#cancel-delete-btn').click();

    // Assert that the user "Cypress" is still in the table
    cy.contains('td', 'cypress').should('exist');

    // Click the "Delete" button again
    cy.contains('td', 'cypress')
      .parent()  
      .find('[id^="delete-user-btn"]') 
      .click();

    // Confirm the deletion
    cy.get('#confirm-delete-btn').click();

    // Assert that the user "Cypress" is no longer in the table
    cy.contains('td', 'cypress').should('not.exist');

    cy.contains('td', 'ahmet').parent().as('ahmetRow');

    // Click the "Edit" button for the "ahmet" user
    cy.get('@ahmetRow').find('[id^="edit-user-btn"]').click();

    // Edit the username to "testing cypress"
    cy.get('#formUsername').clear().type('testing cypress');

    // Click the "Save" button in the edit modal
    cy.get('#save-edit-modal-btn').click();

    // Assert that the edit modal is closed after saving
    cy.get('#save-edit-modal-btn').should('not.exist');

    // Verify that the username is now "testing cypress" in the table
    cy.get('@ahmetRow').contains('td', 'testing cypress').should('exist');

    // Click the "Edit" button again to edit it back to "ahmet"
    cy.get('@ahmetRow').find('[id^="edit-user-btn"]').click();

    // Edit the username back to "ahmet"
    cy.get('#formUsername').clear().type('ahmet');

    // Click the "Save" button in the edit modal
    cy.get('#save-edit-modal-btn').click();

    // Assert that the edit modal is closed after saving
    cy.get('#save-edit-modal-btn').should('not.exist');

    // Verify that the username is now "ahmet" in the table
    cy.get('@ahmetRow').contains('td', 'ahmet').should('exist');

    // Logout
    cy.get('#logout-link').click();

    // Assert that the user is redirected to the login page after logout
    cy.url().should('eq', 'http://localhost:3000/login');
  });
});
