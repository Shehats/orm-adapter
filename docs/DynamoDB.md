## Dynamo Usage:

#### Setting up the Orm configurations for DynamoDB:

```javascript
import { registerOrmProperties, OrmType, DynamoConfig } from 'orm-adapter';
import * as AWS from 'aws-sdk';
import * as dynamo from 'dynamodb';

// Register DynamoDB configs.
const config: DynamoConfig = {
  configPath: 'path to aws config/config.json',
  dynamo: dynamo,
  AWS: AWS,
  dynamoConfig: {}
}

registerOrmProperties(OrmType.DYNAMODB, config);
```

#### Using the API with DynamoDB operations:

##### Using DynamoDB globally:

```javascript
import { getGlobalConnector, createAndRun } from 'orm-adapter';

createAndRun()

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
import { column, id, Entity, OrmType, DynamoConfig } from 'orm-adapter';
import * as AWS from 'aws-sdk';
import * as dynamo from 'dynamodb';

// Register DynamoDB configs.
const config: DynamoConfig = {
  configPath: 'path to aws config/config.json',
  dynamo: dynamo,
  AWS: AWS,
  dynamoConfig: {}
}

@Entity(OrmType.DYNAMODB,config)
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
import { getDynamoConnector, createAndRun } from 'orm-adapter';

createAndRun()

// Getting all nerds.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).findAll())

// Getting a nerd by id = 11.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).findById(11))

// Getting a nerd by a param: firstName = 'sal'.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).findByKey({firstName: 'sal'}))

// Save a nerd.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).save(new User(/* pass your params*/))

// Update a nerd.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).update(someUser))

// Update a nerd by id.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).updateById(11,someUser))

// Delete a nerd.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).delete(someUser))

// Delete a nerd by id.
getDynamoConnector()
.then(conn => conn.getRepository(Nerd).deleteById(11))

```
