Feature: <Get User>
This is a restful api service test project.
You can use json-mock as an api server. Before runing the script, please init the mock message and start the json-mock server. It can be found in your project's node_modules folder. 
Steps:
1. in command prompt, browse to your project folder, 
run the following command:	
json-server --watch db.json

2.run the following command on VS Code terminal:
npm run test


  Scenario Outline: Get User
    * Get the service api "<URL>" and i should get the '<expectval>'
    Examples: 
      | URL                           | expectval                                                                                                                                                           |
      | http://localhost:3000/users/1 | {   "id": 1,   "name": "Jason",   "location": "USA" }                                                                                                               |
                                                                                                  
     
