Feature: Login flow
  As a user
  I want to login to the sample application
  So that I can access the secure area

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I login with valid credentials
    Then I Verify the amount
