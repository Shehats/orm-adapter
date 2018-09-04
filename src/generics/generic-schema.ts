import { Repository } from './generic-repository';

export interface GenericSchema {
  name: string,
  schema: Function|Object|any
  id?: number|string|any,
  hashKey?: number|string|any,
  rangeKey?: number|string|any
}

export interface SchemaField {
}

export interface Connection {
  putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string, object?: Object|any): void,
  getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string): Repository
}

export interface Connector {
  connect(url?: string, params?: any, ...rest: any[]): Promise<Connection|any>;
  ConnectionFunc();
  ConnectionFunc(connectionFunction: Function|any);
  ConnectionApi();
  ConnectionApi(connectionApi: Function|Object|any);
}

export enum OrmType {
  JS_DATA,
  DYNAMODB,
  MONGOOSE,
  BOOK_SHELF,
  CUSTOM
}
