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

## Events

### Get all events

*method url*: `/api/events`

*http method*: **[GET]**

#### Response
##### 200 (OK)

###### Example response
```
[
    {
        "id": 2,
        "event_title": "Tech Conference",
        "event_description": "a great tech conference",
        "image_url": "https://picsum.photos/id/237/200/300",
        "created_at": null,
        "event_date": "25-08-2019",
        "event_time": "10:00 PM",
        "attendees": "Michael Morrison",
        "budget": 600,
        "user_id": 2,
        "completed": 0
    },
    {
        "id": 3,
        "event_title": "Negotiations Skills 2",
        "event_description": "a session on negotiation",
        "image_url": "https://picsum.photos/id/237/200/300",
        "created_at": null,
        "event_date": "20-08-2019",
        "event_time": "12:00 PM",
        "attendees": "Michael Morrison",
        "budget": 600,
        "user_id": 3,
        "completed": 0
    },
    {
        "id": 4,
        "event_title": "Boss's birthday party",
        "event_description": "it's a secret, don't tell anyone",
        "image_url": "https://picsum.photos/id/237/200/300",
        "created_at": null,
        "event_date": "17-09-2019",
        "event_time": "16:00 PM",
        "attendees": "everyone",
        "budget": 200,
        "user_id": 4,
        "completed": 0
    },
]
```

### Get an event

*method url*: `/api/events/:id`

*http method*: **[GET]**

Example response

```
{
   "id": 2,
   "event_title": "Tech Conference",
   "event_description": "a great tech conference",
   "image_url": "https://picsum.photos/id/237/200/300",
   "created_at": null,
   "event_date": "25-08-2019",
   "event_time": "10:00 PM",
   "attendees": "Michael Morrison",
   "budget": 600,
   "user_id": 2,
   "completed": 0,
   "tasks": [
       {
           "id": 2,
           "task_name": "order food",
           "task_completed": false
       }
   ]
 }
```

### Get events from user

*method url*: `/api/events/?user_id=${user_id}`

*http method*: **[GET]**

Example response

```[
       {
           "id": 2,
           "event_title": "Tech Conference",
           "event_description": "a great tech conference",
           "image_url": "https://picsum.photos/id/237/200/300",
           "created_at": null,
           "event_date": "25-08-2019",
           "event_time": "10:00 PM",
           "attendees": "Michael Morrison",
           "budget": 600,
           "user_id": 2,
           "completed": 0
       }
   ]
```

### Create an event

*method url*: `/api/events`

*http method*: **[POST]**

Example request

```
{
	"event_title": "boss's birthday party", 
	"event_description": "it's a secret, don't tell anyone", 
	"event_date": "17-09-2019", 
	"event_time": "16:00 PM",
	, "attendees": "everyone"
	, "budget": 200,
}
```

Example response
```
{
    "id": 7,
    "event_title": "boss's birthday party",
    "event_description": "it's a secret, don't tell anyone",
    "image_url": null,
    "created_at": null,
    "event_date": "17-09-2019",
    "event_time": "16:00 PM",
    "attendees": "everyone",
    "budget": 200,
    "user_id": 4,
    "completed": false,
    "tasks": [],
    "shopping_list": [],
    "vendors": []
}
```

### Update an event

*method url*: `/api/events/:id`

*http method*: **[PUT]**
Example response 
```
{
    "id": 3,
    "event_title": "Negotiations Skills 2",
    "event_description": "a session on negotiation",
    "image_url": "https://picsum.photos/id/237/200/300",
    "event_date": "20-08-2019",
    "event_time": "12:00 PM",
    "attendees": "Michael Morrison",
    "budget": 600,
    "user_id": 4,
    "completed": 0,
    "task_completed": false
}
```

### Delete an event

*method url*: `/api/events/:id`

*http method*: **[DELETE]**

Example response
```
{
    "message": "The event has now been removed from the database."
}
```


## Tasks

### Get all tasks

*method url*: `/api/tasks`

*http method*: **[GET]**

Example response

```
[
    {
        "id": 1,
        "task_name": "reserve seats",
        "event_id": 1,
        "task_completed": 1
    },
    {
        "id": 2,
        "task_name": "order food",
        "event_id": 2,
        "task_completed": 0
    },
]

```

### Get tasks for an event

*method url*: `/api/tasks/?event_id={event_id}`

*http method*: **[GET]**

Example response

```
[
    {
        "id": 1,
        "task_name": "reserve seats",
        "event_id": 1,
        "task_completed": 1
    }
]
```

### Create a task for an event

*method url*: `/api/tasks/?event_id={event_id}`

*http method*: **[POST]**

Example request

```
{
	"task_name": "blah2",
	"task_completed": true
}
```

Example response

```
{
    "id": 8,
    "task_name": "blah2",
    "event_id": 3,
    "task_completed": true
}
```

### Delete a task

*method url*: `/api/tasks/:id`

*http method*: **[DELETE]**

Example response

```
{
    "message": "The task has now been removed from the database."
}
```

### Update a task

*method url*: `/api/tasks/:id`

*http method*: **[PUT]**

Example request

```
{
	"task_name": "Read speech",
	"task_completed": false
}
```

Example response

```
{
    "task_name": "Read speech",
    "task_completed": false,
    "id": 2,
    "event_id": 4
}
```

