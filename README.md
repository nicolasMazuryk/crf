# CRF
CRF for Biofarma

### Available requests
**Public:** <br/>
GET /api/users -> {payload: [Users]} <br>
POST /api/users {email, password, role} -> {payload: User} <br>
DELETE /api/users/:id -> {payload: User} <br>
POST /login {email, password} -> {payload: { token, role } } <br>

**Private:** <br>
GET /logout -> {payload: true} <br>

**Error responses:** <br>
```javascript
{ 
 name = 'Not Found || Bad Request || Unauthorized || ValidationError || CastError',
 status = '404 || 400 || 401 || 400 || 400', <br>
 message
}
```

For private request send `Authentication: Bearer <TOKEN>` header, where TOKEN is a string returned in /login request payload.<br>

### Create users using this command (available roles: 'admin', 'coordinator', 'doctor')
`curl -X POST -d "email=test&password=test&role=admin" http://localhost:7000/api/users`

