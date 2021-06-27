# Pipedrive Integration

Using a Web App, the tasks 1, 3 and 4 were implemented ->  
Link -> https://binary-boss.github.io/ 

API calls have been done in the common personScripts.js
## Task 1:  
- Search "Person" on Pipedrive given name or ID.  
Interface -> getPersonByID.html, searchPersonByName.html 
## Task 4:
- Update a Person on Pipedrive given it's ID.  
Interface -> updatePersonByID.html  
## Task 5:
- Add a "Note" for the Person.  
Interface -> addNoteToPersonByID.html

Task 2 and 3 have been implemented using mulesoft to create a scheduler which polls the webhook endpoints for new/updated person from Pipedrive.
Code -> squadIQ-CRM-integration-api
The application is up and running on cloudhub.
