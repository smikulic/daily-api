## Change DB
go into prisma directory
`prisma deploy`

### Create new user
```
mutation {
  signup(
    email: "myemail@gmail.com"
    password: "mypassword"
  ) {
    token
    user {
      id
    }
  }
}
```

### Login
```
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
    }
    error {
      message
    }
  }
}

{
  "email": "admin@example.com",
  "password": "password"
}
```

### Get Users
```
query {
  users {
    id
    email
  }
}
```

### Current admin
```
{
  "data": {
    "signup": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2o1cTM4bTgwMDFkMDg0M3l1bDNtY2NxIiwiaWF0IjoxNjA4OTg4Mjk4fQ.DGOJMp3iJHn8kWCo1WyEUU4nkG-Phg7_aB4hVmtJ__8",
      "user": {
        "id": "ckj5q38m8001d0843yul3mccq"
      }
    }
  }
}

{
  "data": {
    "signup": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2o1cDRzMzgwMDBzMDg0M2ttMnBtYnBlIiwiaWF0IjoxNjA4OTg2NjkwfQ.19C-bskZxNjbY6PikKL-xgckScb605yVoGU6CZsYhzE",
      "user": {
        "id": "ckj5p4s38000s0843km2pmbpe"
      }
    }
  }
}
```

HTTP Headers in GraphQL Playground
```
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2o1cTM4bTgwMDFkMDg0M3l1bDNtY2NxIiwiaWF0IjoxNjA5MDEyNjAwfQ.UEMO0KFhHJhHtVKgpdhzFNqjJLS7uFKWdy8fQB2mUqY"
}
```