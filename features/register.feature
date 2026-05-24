Feature: User Registration
  As a new user
  I want to register on the application
  So that I can create my account and login

  Scenario: Register the user
    Given I open the login page
    When I click on the register button
    And I enter the all required information
    Then I click on the register
    And I verify user is redirected on homepage
    And I logout
