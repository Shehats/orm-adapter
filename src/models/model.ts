import { createFields } from './helpers';
import { is, Easily } from 'easy-injectionjs';
import { OrmType, Connector } from "../generics";
import { OrmConfig } from './config';
import { getConnector, createSchemas } from "./helpers";

export const registerOrmProperties = (ormType: OrmType, ormConfig: OrmConfig) => {
  Easily('ORM_TYPE', ormType);
  Easily('ORM_CONFIG', ormConfig);
}

/*
TODO
read properties from properties file.
*/
export const readProperties = () => {}

export const ormRunner = (ormType: OrmType, ormConfig: OrmConfig,
                          url?: string, params?: any, ...rest: any[]) => {
  let _connector: Connector = getConnector(ormType, ormConfig);
  createSchemas(ormType,_connector.connect(url, params, rest));
}

export const Entity = <T extends {new(...args: any[]):{}}> (ormType?: OrmType,
  ormConfig?: OrmConfig) => function(target: T) {
  let _ormType: OrmType = ormType||<OrmType>is('ORM_TYPE');
  let _ormConfig: OrmConfig = ormConfig || <OrmConfig>is('ORM_CONFIG');
  Easily(target.name+'_Fields', createFields(_ormType, is(target.name+'_Fields')));
  if (_ormConfig['url']||_ormConfig['params']||_ormConfig['rest']) {
    ormRunner(_ormType, _ormConfig, _ormConfig['url']||_ormConfig['params']||_ormConfig['rest']);
  } else {
    ormRunner(_ormType,ormConfig);
  }
}
