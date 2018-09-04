import { OrmConfig } from '../models/config';
import { Field } from '../models/helpers';

export interface MongooseSchema {
}

export interface MongooseConfig extends OrmConfig {
  mongoose: any,
  url: string
}

export interface MongooseField {
  type: any,
  default?: any,
  required?: Boolean,
  unique?: Boolean
}

export const createMongooseField= (type: string, 
  defaultVal?: any, required?: Boolean, unique?: Boolean): MongooseField => {
  return ((type === 'String')
  ? { type: String, default: defaultVal||'', required: required||false, unique: unique||false } 
  : (type === 'Number')
  ? { type: Number, default: defaultVal||0, required: required||false, unique: unique||false } 
  : (type === 'Boolean')
  ? { type: Boolean, default: defaultVal||false, required: required||false, unique: unique||false } 
  : (type === 'Date')
  ? { type: Date, default: defaultVal||null, required: required||false, unique: unique||false } 
  : (type === 'Array')
  ? { type: Array, default: defaultVal||[], required: required||false, unique: unique||false }
  : { type: String, default: defaultVal||'', required: required||false, unique: unique||false })
}

export const createMongooseSchema = (fields: Field[]): MongooseSchema => {
  const properties: MongooseSchema = {}
  fields.forEach(x => {
    properties[x.name] = (x.params)? createMongooseField(x.type): createMongooseField(x.type,x.params['default'], x.params['required'], x.params['unique'])
  });
  return properties;
}
