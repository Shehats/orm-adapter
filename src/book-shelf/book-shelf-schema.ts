import { OrmConfig } from "../models";

export interface BookShelfConfig extends OrmConfig{
  bookShelf: any, 
  modelBase: any,
  plugins?: any[]
}

export interface BookShelfSchema {
  tableName: string,
  validate: Function|Object|any,
  initialize?: Function,
  hasTimestamps?: boolean,
  parse?: boolean
}

export interface knexConnectionSchema {
  host: string,
  user: string,
  password: string,
  database: string
}

export interface KnexSchema {
  client: string,
  connection: knexConnectionSchema,
  pool?: Function|any,
  migrations?: Function|any
}
