import { Connection, GenericSchema, Connector } from '../generics/generic-schema';
import { DynamoRepository, DynamoConfig } from './dynamo-Repository';
import { Repository } from '../generics';
import { is, Easily } from 'easy-injectionjs';

export class DynamoConnection implements Connection {
  protected _entities = {};
  protected _dynamo: any;
  private static _instance: any = null;

  private constructor(dynamo: any) {
    this._dynamo = dynamo;
  }

  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T), object: GenericSchema): void {
    const entity = this._dynamo.define(target.name, object);
    entity.config({tableName: target.name});
    this._entities[target.name] = new DynamoRepository(entity,target);
  } 

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): Repository {
    return <DynamoRepository>this._entities[target.name];
  }

  public static getInstance(dynamo: any) {
    return this._instance || (this._instance = new DynamoConnection(dynamo));
  }
}

export class DynamoConnector implements Connector {
  protected _dynamo: any;
  protected _config: DynamoConfig;
  protected _AWS: any;

  constructor(config: DynamoConfig) {
    this._dynamo = config.dynamo;
    this._AWS = config.AWS;
    this._config = config;
    Easily('Dynamo_Connector', this);
  }
  
  public connect(url?: string, params?: any, ...rest: any[]): Promise<Connection|any> {
    if (!is('Dynamo_Create')) {
      this._dynamo.AWS.loadFromPath(this._config.configPath);

      let dynamoDB = (this._config.dynamoConfig) 
      ? new this._AWS.DynamoDB(this._config.dynamoConfig)
      : new this._AWS.DynamoDB();
      
      this._dynamo.dynamoDriver(dynamoDB);
      const createDynamo = () => this._dynamo.createTables((err) => {
        if (err)
          console.log('Error creating tables: ', err);
        else 
          console.log('Tables has been created');
      });
      Easily('Dynamo_Create', createDynamo);
    }
    return Promise.resolve(DynamoConnection.getInstance(this._dynamo));
  }
    

  public get ConnectionFunc() {
    return this._dynamo;
  }

  public set ConnectionFunc(connectionFunction: Function|any) {
    this._dynamo = connectionFunction;
  }

  public get ConnectionApi() {
    return this._dynamo;
  }

  public set ConnectionApi(connectionApi: Function|Object|any) {
    this._dynamo = connectionApi;
  }
}
