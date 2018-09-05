import { Repository, Connection, GenericConnector, GenericConnection, OrmType } from '../generics';
import { is, Easily } from 'easy-injectionjs';
import { getConnector } from './helpers';
import { OrmConfig } from './config';

const maybeCreateDynamo = (createDynamo: Function = is('Dynamo_Create')) => {
  if (createDynamo)
    createDynamo()
}

export const registerConnectionFunction = (func: Function|any, connectionApi?: Function|Object|any,orm?: boolean,
  connectClass?: (new(...args: any[]) => GenericConnection|(new(...args: any[]) =>{}))) => {
  let connector = <Connection>is('DB_Connection') || new GenericConnector(orm,func, connectionApi, connectClass);
  Easily('DB_Connection', connector);
}

export const registerOrmProperties = (ormType: OrmType, ormConfig: OrmConfig) => {
  Easily('ORM_TYPE', ormType);
  Easily('ORM_CONFIG', ormConfig);
  Easily('Global_Connector', getConnector(ormType, ormConfig))
}

export const getRepository = <T extends {new(...args: any[]):{}}> (target: T): Repository => <Repository>is(`${target.name}_Repository`);

export const createAndRun = () => {
  maybeCreateDynamo()
}

export const maybeHookCreate = (name: string, func: Function) => {
  let beforeFunc = <Function>is(`${name}_Before_Create`)
  let afterFunc = <Function>is(`${name}_After_Create`)
  return (beforeFunc && afterFunc)
        ? Promise.resolve(beforeFunc.apply(null))
         .then(_1 => func.apply(_1))
         .then(_2 => afterFunc.apply(_2))
        : (beforeFunc && !afterFunc)
        ? Promise.resolve(beforeFunc.apply(null))
          .then(_1 => func.apply(_1))
        : (!beforeFunc && afterFunc)
        ? Promise.resolve(func.apply(null))
          .then(_2 => afterFunc.apply(_2))
        : Promise.resolve(func.apply(null))
}

export const maybeHookUpdate = (name: string, func: Function) => {
  let beforeFunc = <Function>is(`${name}_Before_Update`)
  let afterFunc = <Function>is(`${name}_After_Update`)
  return (beforeFunc && afterFunc)
        ? Promise.resolve(beforeFunc.apply(null))
         .then(_1 => func.apply(_1))
         .then(_2 => afterFunc.apply(_2))
        : (beforeFunc && !afterFunc)
        ? Promise.resolve(beforeFunc.apply(null))
          .then(_1 => func.apply(_1))
        : (!beforeFunc && afterFunc)
        ? Promise.resolve(func.apply(null))
          .then(_2 => afterFunc.apply(_2))
        : Promise.resolve(func.apply(null))
}

export const maybeHookDelete = (name: string, func: Function) => {
  let beforeFunc = <Function>is(`${name}_Before_Delete`)
  let afterFunc = <Function>is(`${name}_After_Delete`)
  return (beforeFunc && afterFunc)
        ? Promise.resolve(beforeFunc.apply(null))
         .then(_1 => func.apply(_1))
         .then(_2 => afterFunc.apply(_2))
        : (beforeFunc && !afterFunc)
        ? Promise.resolve(beforeFunc.apply(null))
          .then(_1 => func.apply(_1))
        : (!beforeFunc && afterFunc)
        ? Promise.resolve(func.apply(null))
          .then(_2 => afterFunc.apply(_2))
        : Promise.resolve(func.apply(null))
}
