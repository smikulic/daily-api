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
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2l3bTA1aWMwMDI4MDk0M3Q2djhpcWFmIiwiaWF0IjoxNjA4NDM3MjQwfQ.ucBYJntYKL0UXlOeArghaKHKu49YdRpfYLcKXCB5MX8",
      "user": {
        "id": "ckiwm05ic00280943t6v8iqaf"
      }
    }
  }
}
```