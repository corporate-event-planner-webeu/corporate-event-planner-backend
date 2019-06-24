# corporate-event-planner-backend

**Back End URL**: 

## API documentation

## Credentials

### Register a user

*method url*: `/api/auth/register`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `email`        | String | Yes      | Must be unique           |
| `first_name`   | String | Yes      |                          |
| `last_name`    | String | No       |                          |
| `password`     | String | Yes      |                          |
| `company`      | String | No       |                          |
| `role`         | String | No       |                          |


#### Request
###### Example request
```
  {
    "email": "collette@email.com",
    "first_name": "collette",
    "last_name": "michaels",
    "password": "123456",
    "company": "Big Tech Company",
    "role": "admin"
  }
  ```
  
  #### Response
  ##### 201 (Created)
  ###### Example Response

```
  {
    "id": 1,
    "email": "collette@email.com",
    "first_name": "collette",
    "last_name": "michaels",
    "company": "Big Tech Company",
    "role": "admin"
  }
```

##### 400 (Bad Request)
###### Example Response
```
  {
    "errorMessage": "Missing required fields."
  }
```

### Login a user
*method url*: `/api/auth/login`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `email`        | String | Yes      | must be registered user  |
| `password`     | String | Yes      |                          |


#### Request
###### Example request
```
  {
    "email": "Collette",
    "password": "123456",
  }
  ```
#### Response
##### 200 (OK)
###### Example response
```
  {
    "user_id": 1,
    "first_name": "collette",
    "last_name": "michaels",
    "email": "collette@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6IkVsbGlvdCIsImVtYWlsIjoiZWxsaW9
    0QGdtYWlsLmNvbSIsImlhdCI6MTU1NTYyMTQ4NCwiZXhwIjoxNTU1NjI1MDg0fQ.k4XzOQi-eElnSkdqReipzowTMugtvjiNcHkxH8kdIfw"
  }
```
##### 400 (Bad Request)
```
  {
    "errorMessage": "Missing email or password."
  }
  ```
  ##### 401 (Unauthorized)
  ```
  {
    errorMessage: "Invalid credentials."
  }
  ```
