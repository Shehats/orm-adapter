import { Connection, Connector } from '../generics/generic-schema';
import { MongooseConfig, createMongooseSchema } from './mongoose-schema';
import { MongooseRepository } from './mongoose-repository';
import { Field } from '../models/helpers';
import { is, Easily } from 'easy-injectionjs';

export class MongooseConnection implements Connection {
  protected _entities = {};
  protected _mongoose: any;
  protected _schema: any;
  private static _instance: any = null;

  private constructor(mongoose: any) {
    this._mongoose = mongoose;
    this._schema = mongoose.Schema;
  }

  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): void {
    let _entity = this._mongoose.model(target.name, this._schema(createMongooseSchema(<Field[]>is(target.name+'_Fields'))))
    this._entities[target.name] = new MongooseRepository(_entity, target);
  } 

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): MongooseRepository {
    return this._entities[target.name]
  }

  public static getInstance(mongoose: any) {
    return this._instance || (this._instance = new this(mongoose));
  }
}

export class MongooseConnector implements Connector {
  protected _mongoose: any;

  constructor(config: MongooseConfig) {
    this._mongoose = config.mongoose;
    if (!is('Mongoose_Connect')) {
      this._mongoose.connect(config.url);
      Easily('Mongoose_Connect', true)
    }
    Easily('Mongoose_Connector', this);
  }
  
  public connect(): Promise<Connection|any> {
    return Promise.resolve(MongooseConnection.getInstance(this._mongoose));
  }
    

  public get ConnectionFunc() {
    return this._mongoose;
  }

  public set ConnectionFunc(connectionFunction: Function|any) {
    this._mongoose = connectionFunction;
  }

  public get ConnectionApi() {
    return this._mongoose;
  }

  public set ConnectionApi(connectionApi: Function|Object|any) {
    this._mongoose = connectionApi;
  }
}
