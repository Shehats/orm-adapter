# orm-adapter
An npm package that adapts other orms into a decorator based orm.
Currently supports:

###### 1- [DynamoDB](docs/DynamoDB.md)

###### 2- [Js-data](docs/JSData.md)

###### 3- [BookShelf](docs/BookShelf.md)

###### 4- [Mongoose](docs/Mongoose.md)

###### 5- [Custom](docs/Custom.md)

## Supported API fields:

###### 1- @Entity() or @Entity(OrmType.<Select_Orm>, OrmConfig): Creates the database model using the defined Orm or in case of passing the parameters it will used the configurations passed.

###### 2- @column() or @column(params): Creates a column in the model. The params are optional and the can veary depending on the orm used.

###### 3- @id: Creates a column as well as identifies as id for quiries and updates.

###### 4- @key: Creates a column as well as identifies as secondary id for quiries and updates.

###### 5- @hasMany: creates a one to many relationship.

###### 6- @belongsTo: creates a one to one relationship.

###### 7- @beforeCreate: runs function before saving model to database.

###### 8- @afterCreate: runs function after saving model to database.

###### 9- @beforeUpdate: runs function before updating model in the database.

###### 10- @afterUpdate: runs function after updating model in the database.

###### 11- @beforeDelete: runs function before deleting model in the database.

###### 12- @afterDelete: runs function after deleting model in the database.

### Creating models:

```javascript
import { column, id, Entity } from 'orm-adapter';
@Entity()
class User {
  @id()
  username: string;
  @column()
  firstName: string;
  @column()
  lastName: string;
  @column()
  email: string;
}
```
##### That will simply create a user model using any orm or custom database connector and connection.

#### You can also create different models using different orms:

User.ts
```javascript
import { column, id, Entity } from 'orm-adapter';
@Entity()
class User {
  @id()
  username: string;
  @column()
  firstName: string;
  @column()
  lastName: string;
  @column()
  email: string;
}
```

Nerd.ts
```javascript
import { Schema, Container } from 'js-data';
import { MongoDBAdapter } from 'js-data-mongodb';
import { column, id, Entity } from 'orm-adapter';
@Entity(JS_DATA,
        <JsDataConfig>{ Schema: Schema,
                        Adapter: MongoDBAdapter,
                        adapterConfig: { uri: 'mongodb://localhost:27017' },
                        adapterName: "mongodb",
                        Container: Container })
class Nerd {
  @id()
  realName: string;
  @column()
  alterEgo: string;
  @column()
  cursh: string;
}
```

User will be created using the global orm and Nerd will be created using js-data.

### Life hooks Support?:

```javascript
import { column, id, 
         Entity,
         beforeCreate,
         afterCreate,
         beforeUpdate,
         afterUpdate,
         beforeDelete,
         afterDelete } from 'orm-adapter';

@Entity()
class Nerd {
  @id()
  realName: string;
  @column()
  alterEgo: string;
  @column()
  cursh: string;
  // lets help our friend out.
  @beforeCreate()
  initialize() {
    // Do some real work then joke a little:
    console.log('You have no chance buddy.');
  }
  @afterCreate()
  ready (data: any) {
    // Do real job with the data.
    console.log(data);
  }
  
  @beforeUpdate()
  myMan() {
    // Do some real work then joke a little:
    console.log('You still have no chance buddy.')
  }
  @afterUpdate()
  newMan (data: any) {
    // Do real job with the data.
    console.log(data);
  }
  
  @beforeDelete()
  beforeRest() {
    // Do some real work then joke a little:
    console.log('High five');
  }
  @afterDelete()
  afterRest (data: any) {
    // Do real job with the data.
    console.log(data);
  }
}
```
### The api also supports multiple helpful properties:

```javascript
import { column, id, Entity,
         key, passwordField,
         ignore, hasMany,
         belongsTo } from 'orm-adapter';

@Entity()
class User {
  @id()
  username: string;
  @column()
  firstName: string;
  @column()
  lastName: string;
  @key()
  email: string;
  @ignore()
  deepSecret: string;
  @passwordField()
  password: string;
  @hasMany(Friend /*or 'Friend'*/)
  friends: Friend[];
  @belongsTo(Friend /*or 'Friend'*/)
  bestFriend: Friend;
}

```
