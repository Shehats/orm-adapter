import { OrmConfig } from "../models";

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

export interface BookShelfConfig extends OrmConfig{
  bookShelf: any,
  kneex: Function|any,
  modelBase: any,
  kneexSchema: KnexSchema,
  plugins?: any[]
}

export interface BookShelfSchema {
  tableName: string,
  validate: Function|Object|any,
  initialize?: Function,
  hasTimestamps?: boolean,
  parse?: boolean
}
