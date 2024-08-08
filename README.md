# userManagement
1)curl for registrstion looks like
curl --location 'localhost:3700/user-registration' \
--header 'Content-Type: application/json' \
--data-raw '{"userName":"sumit","email":"sumit@gmail.com","password":"Skss5406","team":"design"}'
2)curl for login
curl --location 'localhost:3700/login' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"shivamm@gmail.com","password":"Skss5406"}'
3)curl for logout
curl --location 'localhost:3700/logout' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIxYjA4OTU5NjMzNWRhZGJiY2NkN2MiLCJpYXQiOjE3MjI5MjE5MDMsImV4cCI6MTcyMzAyOTkwM30.o7Tywuid95HCic9hMxo83lvt9wdhmDsI2LJPNzFyYoE'
4)get profile
curl --location 'localhost:3700/get-profile' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmI0NWM5YmM4MDdhNmFkNjQwZjI4MGMiLCJpYXQiOjE3MjMwOTYyNjgsImV4cCI6MTcyMzIwNDI2OH0.B3trxF45aJdiXmxddaBk8TDYC_VaDuprXBJ3vaDrbNs'
5)task-creation
curl --location 'localhost:3700/task-creation' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIyZjVkMjZiZjdjYWMyZGExODY5MzEiLCJpYXQiOjE3MjMwMDQ3NTEsImV4cCI6MTcyMzExMjc1MX0.8T28mxrTtvXCw1_5dO7hICMwA49kkzN7nDOdarsNqpQ' \
--header 'Content-Type: application/json' \
--data '
   {
  "title": "create logs",
  "description": "This is a description of creating logs.",
  "dueDate": "2024-08-31T23:59:59Z",
  "priority": "High",
  "status": "Pending",
  "assignedTo": "66b2f63b6bf7cac2da18693c",
  "createdBy": "66b2f6256bf7cac2da186939"
}

'
6)get-task
curl --location 'localhost:3700/get-task' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIyZjVkMjZiZjdjYWMyZGExODY5MzEiLCJpYXQiOjE3MjMwOTE0MDQsImV4cCI6MTcyMzE5OTQwNH0.KO0kKWEAs6ZyXXBozDdBNK0dD1gYAoUq79jBRK7ZnNk'
7)edit task
curl --location --request PUT 'localhost:3700/edit-task/66b45f825f8c6d68291385a8' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIyZjYyNTZiZjdjYWMyZGExODY5MzkiLCJpYXQiOjE3MjMwOTcyNjIsImV4cCI6MTcyMzIwNTI2Mn0.QQLie71RSO22hDiesworaoaJROU_j0s1p87jYLXbCDg' \
--header 'Content-Type: application/json' \
--data '{
    "title":"test2"
}'
8)delete task
curl --location --request DELETE 'localhost:3700/delete-task/66b45f825f8c6d68291385a8' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIyZjYyNTZiZjdjYWMyZGExODY5MzkiLCJpYXQiOjE3MjMwOTcyNjIsImV4cCI6MTcyMzIwNTI2Mn0.QQLie71RSO22hDiesworaoaJROU_j0s1p87jYLXbCDg' \
--header 'Content-Type: application/json' \
--data '{
    "title":"test2"
}'
//installation    
after doing git fetch and pull run npm i
