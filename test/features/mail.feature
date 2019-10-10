Feature: <Mail Send>
This is a restful api service test project.
You can use json-mock as an api server. Before runing the script, please init the mock message and start the json-mock server. It can be found in your project's node_modules folder. 
Steps:
1. in command prompt, browse to your project folder, 
run the following command:	
json-server --watch db.json

2.run the following command on VS Code terminal:
npm run test


  Scenario Outline: Post Sends Mail
    * Post to service api "<URL>" with '<data>' and I should get the '<expectval>'
    Examples: 
      | URL                                    | data                                                                                                                                                          | expectval                                             |
      | http://localhost:3000/mail | { "emailto":"admin@gmail.com","emailfrom":"user@gmail.com","date":"2019/10/20","Subject":"Product low","discription":"your kellogs chocos seems to be low please refill" } | {  "status": 201} |