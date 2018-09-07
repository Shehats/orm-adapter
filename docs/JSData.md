## Js-Data Usage:

#### Setting up the Orm configurations for Js-Data:

```javascript
import { registerOrmProperties, OrmType, JsDataConfig } from 'orm-adapter';
import { Schema, Container } from 'js-data';
import { MongoDBAdapter } from 'js-data-mongodb';

// Register Js-Data configs.
registerOrmProperties(OrmType.JS_DATA, <JsDataConfig>{
  Schema: Schema,
  Container: Container,
  Adapter: MongoDBAdapter,
  adapterConfig: {
    debug: true,
    uri: 'mongodb://localhost/test'
  },
  adapterName: 'mongodb'
})
```

#### Using the API with Js-Data operations:

##### Using Js-Data globally:

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
import { column, id, Entity, OrmType, JsDataConfig } from 'orm-adapter';
import { Schema, Container } from 'js-data';
import { MongoDBAdapter } from 'js-data-mongodb';

// Register JS-Data configs.
const config: JsDataConfig = {
  Schema: Schema,
  Container: Container,
  Adapter: MongoDBAdapter,
  adapterConfig: {
    debug: true,
    uri: 'mongodb://localhost/test'
  },
  adapterName: 'mongodb'
}


@Entity(OrmType.JS_DATA,config)
class Nerd {
  @id()
  realName: string;
  @column()
  alterEgo: string;
  @column()
  cursh: string;
}
```

##### If Used Js-Data in the previous implementation:

```javascript
import { getJSDataConnector } from 'orm-adapter';

// Getting all nerds.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).findAll())

// Getting a nerd by id = 11.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).findById(11))

// Getting a nerd by a param: firstName = 'sal'.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).findByKey({firstName: 'sal'}))

// Save a nerd.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).save(new User(/* pass your params*/))

// Update a nerd.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).update(someUser))

// Update a nerd by id.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).updateById(11,someUser))

// Delete a nerd.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).delete(someUser))

// Delete a nerd by id.
getJSDataConnector()
.then(conn => conn.getRepository(Nerd).deleteById(11))

```
