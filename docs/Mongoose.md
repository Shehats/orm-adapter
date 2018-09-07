## Dynamo Usage:

#### Setting up the Orm configurations for DynamoDB:

```javascript
import { registerOrmProperties, OrmType, MongooseConfig } from 'orm-adapter';
import * as mongoose from 'mongoose';

// Register Mongoose configs.
const config: MongooseConfig = {
  mongoose: mongoose,
  url:  'mongodb://localhost/test'
}

registerOrmProperties(OrmType.MONGOOSE, config);
```

#### Using the API with Mongoose operations:

##### Using Mongoose globally:

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

##### Using Mongoose for Specific models:

```javascript
import { column, id, Entity, OrmType, MongooseConfig } from 'orm-adapter';
import * as mongoose from 'mongoose';

// Register Mongoose configs.
const config: MongooseConfig = {
  mongoose: mongoose,
  url:  'mongodb://localhost/test'
}

@Entity(OrmType.MONGOOSE,config)
class Nerd {
  @id()
  realName: string;
  @column()
  alterEgo: string;
  @column()
  cursh: string;
}
```

##### If Used DynamoDB in the previous implementation:

```javascript
import { getMongooseConnector } from 'orm-adapter';

// Getting all nerds.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).findAll())

// Getting a nerd by id = 11.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).findById(11))

// Getting a nerd by a param: firstName = 'sal'.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).findByKey({firstName: 'sal'}))

// Save a nerd.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).save(new User(/* pass your params*/))

// Update a nerd.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).update(someUser))

// Update a nerd by id.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).updateById(11,someUser))

// Delete a nerd.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).delete(someUser))

// Delete a nerd by id.
getMongooseConnector()
.then(conn => conn.getRepository(Nerd).deleteById(11))

```
