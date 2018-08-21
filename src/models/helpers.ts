import * as Joi from 'joi';
import * as dynamo from 'dynamodb';
import { Easily, is } from 'easy-injectionjs';
import 'reflect-metadata';

export interface Field {
  type: any,
  name: string,
  params?: string | any | any[]
}

export const createType = (config: string, type: string) =>
  (type === 'String' && config === 'email') ? Joi.string().email(): (type === 'String') ? Joi.string()
  : (type === 'Number')? Joi.number()
  : (config.toLowerCase() === 'string' && type === 'Array') ? dynamo.types.stringSet() : (type === 'Array')
  ? dynamo.types.numberSet()
  : (type === 'Boolean') ? Joi.boolean()
  : (type === 'Date') ? Joi.date(): dynamo.types.uuid()

export const createField = (target: Object,
  key: string,params?: string | any | any[]) => {
  let field: Field = {
    type: createType(<string>params,Reflect.getMetadata("design:type", target, key).name),
    name: key,
    params: params
  }
  let stack = <Field[]>is(target.constructor.name+'_Fields') || [];
  stack.push(field)
  Easily(target.constructor.name+'_Fields', stack);
}

export const createSchema = <T extends {new(...args: any[]):{}}> (target: T) => {
  let hashKey = <string> is('hashkey_'+target.name);
  let rangeKey = <any> is('hashkey_'+target.name);
  let stack = <Field[]>is(target.name+'_Fields');
  let schema = { hashKey: hashKey, schema: {} };
  schema['rangeKey'] = rangeKey;
  while (stack && stack.length > 0) {
    let x = stack.pop();
    schema['schema'][x.name] = x.type;
  }
  return dynamo.define(target.name, schema);
}