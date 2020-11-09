I have used json-server for api calls, To run json mock api kindly execute below command on the folder json-mock-api
        ->npm install -g json-server
        ->json-server --watch src/db.json

URL : http://localhost:3000/employees

To run react pplication kindly execute below commands on the folder my-app, it will run on port 3006 as json server runs on 3000
    ->npm install
    ->npm start


Test can be executed by below command on my-app folder:
    ->npm test

URL : http://localhost:3006/

I have used jest enzyme for running test.


I wasn't able to add like search on first name and last name, I could have added that on the existing data set.
I was not able to do custom Hook testing, I will need to learn that and will do it in coming weeks.

Further components can be de-structured, to make them more independent.

