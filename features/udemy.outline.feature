@LogIn @Enroll @API

Feature: Enroll in a Udemy course

  Login on Udemy, search for a free course, and enroll in it.
  Check via API if the enrollment was successful.

  Background: LogIn
    Given I log in the website

  Scenario Outline: Enroll on course
    Given I select a category on the homescreen
    And I apply the filters for free and english courses
    When I select the second result and enroll in the course
# Then Start to type your Then step here