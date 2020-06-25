# Back-End

Link for Database http://plant-app-pt13.herokuapp.com/

## Database Schemas

The description of the structure and extra information about each _Plant_ stored in the included database (`plant-app.db3`) is listed below.

## User Schema

| Field        | Data Type | Metadata             |
| ------------ | --------- | -------------------- |
| id           | integer   | Primary Key          |
| username     | string    | required and unique. |
| password     | string    | required field.      |
| phone_number | string    | (optional).          |
| avatar_url   | string    | (optional).          |

## Authentication

The `/auth/login` and `/auth/register` endpoints will respond with a JSON object containing your JWT in the property `token`.

To authorize your requests to the `/users` and `/plants` endpoints, set the HTTP header `Authorization` to `Basic $INSERT_YOUR_JWT`.

### API

Test Account - stored in seeds data.

```js
    {
          id: 1,
          username: 'rowValue1',
          password: '123456'
        }
```

### Endpoints

| TYPE | Path           | Metadata                                       |
| ---- | -------------- | ---------------------------------------------- |
| POST | /auth/register | Register a new user.                           |
| POST | /auth/login    | User login in to Account.                      |
| GET  | /users/:id     | User login in to Account once account created. |
| PUT  | /users/:id     | Update user account                            |

### Notes for iOS implementation

For Post request, be sure to set

```js
request.setValue("application/json", (forHTTPHeaderField: "Content-Type"));
```

| TYPE | Path           | Metadata                                                        |
| ---- | -------------- | --------------------------------------------------------------- |
| POST | /auth/register | Properties needed in the body are '`username`' and '`Password`' |
| POST | /auth/login    | Properties needed in the body are '`username`' and '`Password`' |

## Plants Schema

| Field           | Data Type | Metadata                                                 |
| --------------- | --------- | -------------------------------------------------------- |
| id              | integer   | Primary Key                                              |
| nickname        | string    | required field.                                          |
| species         | string    | (optional).                                              |
| h2O_frequency   | integer   | (optional).                                              |
| avatar_url      | string    | (optional).                                              |
| happiness       | boolean   | To indicate if plant is happy or not (default to false). |
| last_watered_at | date      | Add date plant was last watered. (optional)              |
| user_id         | integer   | Foreign Key. Field that links the user and plant entry   |

### API

Test information - stored in seeds data.

```js
        {
          nickname: 'snake plant',
          species: 'Dracaena trifasciata',
          h2O_frequency: 3,
          avatar_url: 'plant_img',
          happiness: true,
          last_watered_at: '06/19/2020',
          user_id: 1
        }
```

### Endpoints

| TYPE   | Path        | Metadata                                                                       |
| ------ | ----------- | ------------------------------------------------------------------------------ |
| GET    | /plants     | Retrieves plants data.                                                         |
| GET    | /plants/:id | Retrieves a plant data given an id.                                            |
| POST   | /plants/    | Creates a new plant entry (refer to plant schema for required fields to entry) |
| PUT    | /plants/:id | Update a plant entry given an id. (value required)                             |
| DELETE | /plants/:id | Delete a plant entry given and id.                                             |
