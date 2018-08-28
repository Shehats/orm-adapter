import { AdapterSchema } from "../js-data";
import { GenericConnection } from "../generics";

export interface OrmConfig {}

export interface JsDataConfig extends OrmConfig {
  Schema: any,
  Adapter: any,
  adapterConfig: AdapterSchema,
  adapterName: string,
  Container: any
}

export interface GenericConfig extends OrmConfig {
  orm: boolean, connectionFunction: Function|any, 
  connectionApi?: Function|Object|any,
  connectClass?: (new(...args: any[]) => GenericConnection|(new(...args: any[]) =>{}))
}
