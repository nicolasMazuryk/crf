# CRF
CRF for Biofarma

### Available requests
**Public:** <br/>
GET /api/users -> {payload: [Users]} <br> 
POST /api/users {email, password} -> {payload: User} <br>
DELETE /api/users/:id -> {payload: User} <br>
POST /login {email, password} -> {payload: TOKEN} <br>

**Private:** <br/>
GET /logout -> {payload: true} <br>

For private request send `Authentication: Bearer <TOKEN>` header, where TOKEN is a string returned in /login request payload.<br>
**Note! Request can return wrong error or status code**

### Create user using this command 
`curl -X POST -d "email=test&password=test" http://localhost:7000/api/users`

