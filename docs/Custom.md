## Custom Database Orm Usage:

#### Setting up the Orm configurations for Js-Data:

```javascript
import { registerConnectionFunction } from 'orm-adapter';

// Creating custom database connector

// Create a method to connect to database
const connect = () => {
  // Some work to connect to DB.
}

// Set connection API if any store or container
const container = new Container()

registerConnectionFunction(connect, container)

// You can also use an orm that hasn't been implemented:

registerConnectionFunction(connect, container, null, true)
```

The previous usage will use the connection function to connect to the database and the API to fetch, update, create and delete data from database.

You can further override the API. It is a bit hasty and long but doable:

```javascript
import { registerConnectionFunction, GenericConnector, GenericConnection, GenericRepository } from 'orm-adapter';

class MyRepository extends GenericRepository {
  constructor (entity: (new(...args: any[]) => {})|Object|any, connectionApi: Function|Object|any) {
    super(entity,connectionApi)l
  }

  public findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{
  
  }

  public findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any {
  
  }

  public findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any {
  
  }

  public save <T extends {new(...args:any[]):{}}> (target: T|any) {
  
  }

  public update <T extends {new(...args:any[]):{}}> (target: T|any) {
  
  }

  public updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any) {
    
  }

  public delete <T extends {new(...args:any[]):{}}> (target: T|any) {
  
  }

  public deleteById (id: number|string|any) {
    
  }
}

class MyConnection extends GenericConnection {
  constructor (connectionApi: Function|Object|any) {
    super(connectionApi);
  }

  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string, object?: Object|any): void {
    
  } 

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string): Repository {
    
  }
}

class MyConnector extends GenericConnector {
  constructor (orm: boolean, connectionFunction: Function|any, 
    connectionApi?: Function|Object|any,
    connectClass?: (new(...args: any[]) => GenericConnection|(new(...args: any[]) =>{}))) {
    super(orm,connectionApi,connectClass);
  }

  public connect(url: string, params: any, ...rest: any[]): Promise<Connection|any> {
    
  }

  public get ConnectionFunc() {
  
  }

  public set ConnectionFunc(connectionFunction: Function|any) {
  }

  public get ConnectionApi() {
  }

  public set ConnectionApi(connectionApi: Function|Object|any) {
  }
}

registerConnectionFunction(null, null, myConnector)

```

##### Using API globally:

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
