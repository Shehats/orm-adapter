import { GenericEntity, CommonEntity } from './generic-entity';
import { is, Easily } from 'easy-injectionjs';
import { Connection, Connector } from './generic-schema';

export class GenericConnection implements Connection {
  private _entities: {string: CommonEntity};
  private _connectionApi: Function|Object|any;

  constructor (connectionApi: Function|Object|any) {
    this._connectionApi = connectionApi;
  }

  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string, object?: Object|any): void {
    let name: string = (target instanceof Function)
                       ? (<Function>target).name :(typeof target === 'string')
                       ? target : (<T>target).name;
    this._entities[name] = new GenericEntity((object)?object: target, this._connectionApi);
  }

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string): GenericEntity {
    return (target instanceof Function)
    ? this._entities[(<Function>target).name]
    : (typeof target === 'string')
    ? this._entities[target]
    : this._entities[(<T>target).name];
  }
}

export class GenericConnector implements Connector{
  private _connectionFunc: Function|any;
  private _connectionApi: Function|Object|any;
  private _orm: boolean;
  private _connectionClass: (new(...args: any[]) => GenericConnection)|(new(...args: any[]) =>{});

  constructor (orm: boolean, connectionFunction: Function|any, 
    connectionApi?: Function|Object|any,
    connectClass?: (new(...args: any[]) => GenericConnection|(new(...args: any[]) =>{}))) {
    this._orm = orm;
    this._connectionFunc = connectionFunction;
    this._connectionApi = connectionApi;
    this._connectionClass = (connectClass)? connectClass: GenericConnection;
  }

  public connect(url: string, params: any, ...rest: any[]): Promise<Connection|any> {
    return (this._orm)
    ? this._connectionFunc(params)
    : Promise.resolve((rest)
        ? this._connectionFunc(url, params, rest)
        : this._connectionFunc(url, params))
      .then(conn => new this._connectionClass((this._connectionApi)? this._connectionApi: conn))
      .catch(err => err);
  }

  public get ConnectionFunc() {
    return this._connectionFunc;
  }

  public set ConnectionFunc(connectionFunction: Function|any) {
    this._connectionFunc = connectionFunction;
  }

  public get ConnectionApi() {
    return this._connectionApi;
  }

  public set ConnectionApi(connectionApi: Function|Object|any) {
    this._connectionApi = connectionApi;
  }
}

export const ConnectionFunction = (func: Function|any, connectionApi?: Function|Object|any,orm?: boolean,
                     connectClass?: (new(...args: any[]) => GenericConnection|(new(...args: any[]) =>{}))) => {
  let connector = <Connection>is('DB_Connection') || new GenericConnector(orm,func, connectionApi, connectClass);
  Easily('DB_Connection', connector);
}
