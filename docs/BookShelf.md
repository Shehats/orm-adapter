## BookShelf Usage:

#### Setting up the Orm configurations for DynamoDB:

```javascript
import { registerOrmProperties, OrmType, BookShelfConfig, knexConnectionSchema } from 'orm-adapter';
import * as Knex from 'knex';
import * as BookShelf from 'bookshelf';
import * as ModelBase from 'bookshelf-modelbase';

// Set up knex.
const knexSchema: knexConnectionSchema = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
})

// Register BookShelf configs.
const config: BookShelfConfig = {
  bookShelf: BookShelf,
  kneex: Knex,
  modelBase: ModelBase,
  kneexSchema: knexSchema,
  plugins: [/*Plugins needed.*/]
}

registerOrmProperties(OrmType.BOOKSHELF, config);
```

#### Using the API with BookShelf operations:

##### Using BookShelf globally:

```javascript
import { getGlobalConnector } from 'orm-adapter';

// Getting all users.
getGlobalConnector()
.then(conn => conn.getRepository(User).findAll())

// Getting a user by id = 11.
getGlobalConnector()
.then(conn => conn.getRepository(User).findById(11))

// Getting a user by a param: firstName = 'sal'.
getGlobalConnector()
.then(conn => conn.getRepository(User).findByKey({firstName: 'sal'}))

// Save a user.
getGlobalConnector()
.then(conn => conn.getRepository(User).save(new User(/* pass your params*/))

// Update a user.
getGlobalConnector()
.then(conn => conn.getRepository(User).update(someUser))

// Update a user by id.
getGlobalConnector()
.then(conn => conn.getRepository(User).updateById(11,someUser))

// Delete a user.
getGlobalConnector()
.then(conn => conn.getRepository(User).delete(someUser))

// Delete a user by id.
getGlobalConnector()
.then(conn => conn.getRepository(User).deleteById(11))
```

##### Using DynamoDB for Specific models:

```javascript
import { column, id, Entity, OrmType, BookShelfConfig, knexConnectionSchema } from 'orm-adapter';
import * as Knex from 'knex';
import * as BookShelf from 'bookshelf';
import * as ModelBase from 'bookshelf-modelbase';

// Set up knex.
const knexSchema: knexConnectionSchema = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
})

// Register BookShelf configs.
const config: BookShelfConfig = {
  bookShelf: BookShelf,
  kneex: Knex,
  modelBase: ModelBase,
  kneexSchema: knexSchema,
  plugins: [/*Plugins needed.*/]
}

@Entity(OrmType.BOOKSHELF,config)
class Nerd {
  @id()
  realName: string;
  @column()
  alterEgo: string;
  @column()
  cursh: string;
}
```

##### If Used BookShelf in the previous implementation:

```javascript
import { getBookShelfConnector } from 'orm-adapter';

// Getting all nerds.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).findAll())

// Getting a nerd by id = 11.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).findById(11))

// Getting a nerd by a param: firstName = 'sal'.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).findByKey({firstName: 'sal'}))

// Save a nerd.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).save(new User(/* pass your params*/))

// Update a nerd.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).update(someUser))

// Update a nerd by id.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).updateById(11,someUser))

// Delete a nerd.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).delete(someUser))

// Delete a nerd by id.
getBookShelfConnector()
.then(conn => conn.getRepository(Nerd).deleteById(11))

```
