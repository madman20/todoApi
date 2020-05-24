# todoApi

> Basic todo crud with basic jwt authentication and basic unit test cases 

> directory and file explaination as follows--

.
+-- ./app.js                                   > server app
+-- ./config
│   +-- ./config/config                        > creating config for running test cases
│   │   \-- ./config/config/default.json
│   +-- ./config/default.json                  > config for constants
│   \-- ./config/Readme.md                     > Reason for separate config for test cases
+-- ./dir_list.txt                             > dir structure
+-- ./helpers                                  > common functions used among components for code reuse 
│   \-- ./helpers/auth.js
+-- ./middleware                               > middleware used among request flow,Here JWT authentication
│   \-- ./middleware/auth.js
+-- ./models                                   > collection structure
│   +-- ./models/todo.js
│   \-- ./models/user.js
+-- ./package.json                             > required dependencies and task automation
+-- ./package-lock.json
+-- ./README.md                                > This doc
+-- ./routes
│   +-- ./routes/auth.js                       > separate routes for generating token for authentication and authorization
│   +-- ./routes/todo.js                       > For Todo CRUD operation
│   \-- ./routes/user.js                       > To signUp user for generating authentication
+-- ./services
│   +-- ./services/todo.js                     > logical layer as per model entity for todo
│   \-- ./services/user.js                     > logical layer as per model entity for user
\-- ./test                                     > Basic Unit Test cases developed with TDD approach and are independent 
    +-- ./test/auth.test.js                    > auth token route flow
    +-- ./test/todo.test.js                    > todo routes flow 
    \-- ./test/user.test.js                    > user routes flow

8 directories, 20 files

## Run locally 

- Clone your repo down to your local machine
- Install dependencies with `npm install`
- Run the server locally with `npm run dev`
- To run test cases `npm run test`

## View local app in browser

- <http://localhost:3000>
- <http://localhost:3000/todo/list>


## Flow to check APIs

- Set VERB + URI (and configure request if sending POST data)
- GET <http://localhost:3000/todo/all> - Send
- POST <http://localhost:3000/user/signup> - set  Body{name,email,password} / JSON / JSON & get back token
- POST <http://localhost:3000/todo/user> - set Auth / Bearer Token & Body / Raw / JSON / set "task" - Send
- GET <http://localhost:3000/todo/user> - set Auth / Bearer Token & Body / JSON & get back task-id - Send 
- PUT <http://localhost:3000/todo/user/:task-id> - set Auth / Bearer Token & Body / Raw / JSON / set "task" with new value - Send 
- DELETE <http://localhost:3000/todo/user/:task-id> - set Auth / Bearer Token & copy id from post call and replace id - Send

Note : Auth Routes are for user info and get token for protected routes if user is already exists.