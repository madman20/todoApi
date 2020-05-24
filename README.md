# todoApi

> Basic todo crud with basic jwt authentication and basic unit test cases 

> directory and file explaination as follows--

## Directory Structure
- view <https://github.com/madman20/todoApi/blob/master/dir_list.txt>

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