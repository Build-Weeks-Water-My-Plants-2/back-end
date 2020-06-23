# Back-End

Link for Database

## Database Schemas

The description of the structure and extra information about each _Plant_ stored in the included database (`plant-app.db3`) is listed below.

## User Schema

| Field        | Data Type | Metadata             |
| ------------ | --------- | -------------------- |
| id           | integer   | Primary Key          |
| username     | string    | required and unique. |
| password     | string    | required field.      |
| phone_number | string    | required field.      |
| avatar_url   | string    | (optional).          |

## Authentication

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
| POST | /api/auth      | Register a new user.                           |
| POST | /api/users     | User login in to Account.                      |
| GET  | /api/users/:id | User login in to Account once account created. |
| PUT  | /api/users/:id | Update user account                            |

## Plants Schema

| Field           | Data Type | Metadata                                                 |
| --------------- | --------- | -------------------------------------------------------- |
| id              | integer   | Primary Key                                              |
| nickname        | string    | required field.                                          |
| species         | string    | required field.                                          |
| h2O_frequency   | integer   | required field.                                          |
| avatar_url      | string    | (optional)                                               |
| happiness       | boolean   | To indicate if plant is happy or not (default to false). |
| last_watered_at | date      | Add date plant was last watered. (required field)        |
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

| TYPE   | Path            | Metadata                                                                       |
| ------ | --------------- | ------------------------------------------------------------------------------ |
| GET    | /api/plants     | Retrieves plants data.                                                         |
| GET    | /api/plants/:id | Retrieves a plant data given an id. id                                         |
| POST   | /api/plants/    | Creates a new plant entry (refer to plant schema for required fields to entry) |
| PUT    | /api/plants/:id | Update a plant entry given an id.(value required)                              |
| DELETE | /api/plants/:id | Delete a plant entry given and id (value required)                             |
