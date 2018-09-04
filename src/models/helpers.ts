import * as Joi from 'joi';
import { Easily, is } from 'easy-injectionjs';
import 'reflect-metadata';
import { OrmType, Connection, Connector, GenericConnector } from '../generics';
import { createJSDataField } from '../js-data/js-data-repository';
import { from } from 'rxjs';
import { OrmConfig, JsDataConfig, GenericConfig } from './config';
import { JSDataConnector } from '../js-data';
import { createDynamoType, DynamoConfig } from '../dynamo/dynamo-Repository';
import { DynamoConnector } from '../dynamo/dynamo-connection';
import { BookShelfConnector, BookShelfConfig } from '../book-shelf';

export interface Field {
  name: string,
  type: any,
  params?: string | any | any[]
}

export const getGlobalOrm = () => <OrmType>is('ORM_TYPE');

export const getDynamo = () => <any>is('Dynamo');

export const getGlobalConnector = () => <Promise<Connection>>(<Connector>is('Global_Connector')).connect(is('DB_URL'), is('DB_PARAMS'))

export const createType = (config: string, type: string) =>
  (type === 'String' && config === 'email') ? Joi.string().email(): (type === 'String') ? Joi.string()
  : (type === 'Number')? Joi.number()
  : (type === 'Boolean') ? Joi.boolean()
  : (type === 'Date') ? Joi.date(): null

export const registerField = (target: Function,
  key: string,params?: string | any | any[]) => {
  let field: Field = {
    type: Reflect.getMetadata("design:type", target, key).name,
    name: key,
    params: params
  }
  let stack = <Field[]>is(target.name+'_Fields') || [];
  stack.push(field)
  Easily(target.constructor.name+'_Fields', stack);
}

export const createFields = (ormType: OrmType, fields: Field[]) => {
  return fields.map(field => (ormType === OrmType.JS_DATA)
                            ? {...field, type: createJSDataField(field.type)}
                            : (ormType === OrmType.DYNAMODB)
                            ? {...field, type: createDynamoType(field.name,field.name, getDynamo())}
                            : field);
}

export const getConnector = (ormType: OrmType, ormConfig: OrmConfig) => {
 return (ormType === OrmType.JS_DATA)
 ? new JSDataConnector((<JsDataConfig>ormConfig).Schema,
    (<JsDataConfig>ormConfig).Adapter,
    (<JsDataConfig>ormConfig).adapterConfig,
    (<JsDataConfig>ormConfig).adapterName,
    (<JsDataConfig>ormConfig).Container)
 : (ormType === OrmType.DYNAMODB)
 ? new DynamoConnector(<DynamoConfig>ormConfig)
 : (ormType === OrmType.BOOK_SHELF)
 ? new BookShelfConnector(<BookShelfConfig>ormConfig)
 : new GenericConnector((<GenericConfig>ormConfig).orm,
    (<GenericConfig>ormConfig).connectionFunction,
    (<GenericConfig>ormConfig).connectionApi,
    (<GenericConfig>ormConfig).connectClass);
}

export const maybeCreateDynamo = (createDynamo: Function = is('Dynamo_Create')) => {
  if (createDynamo)
    createDynamo()
}

export const createSchema = <T extends {new(...args: any[]):{}}> (connector: Promise<Connection> = getGlobalConnector(),
                            entity: T) => {
  from(connector)
  .subscribe(
    (conn: Connection) => {
      conn.putRepository(entity)
    },
    err => console.error(err)
  )
}
