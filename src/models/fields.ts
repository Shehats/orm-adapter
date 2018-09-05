import { Easily, is } from 'easy-injectionjs';
import { registerField } from './helpers';
import { HasMany, BelongsTo } from '../js-data';

export const column = (params?: string | any | any[]) => 
function (target: Object, key: string) {
  registerField(<Function>target, key, params);
}

export const id = (params?: string | any | any[]) => 
function (target: Object, key: string) {
  Easily(target.constructor.name+'_ID', key)
  Easily('hashkey_'+target.constructor.name, key);
  registerField(<Function>target, key, params);
}

export const key = (params?: string | any | any[]) => 
function (target: Object, key: string) {
  Easily('rangeKey_'+target.constructor.name, key);
  registerField(<Function>target, key, params);
}

export const passwordField = (params?: string | any | any[]) => 
function (target: Object, key: string) {
  Easily('Password_'+target.constructor.name, key);
  registerField(<Function>target, key, params);
}

export function ignore (target: Object, key: string) {
  Easily('Ignore_'+target.constructor.name, key);
}

export const hasMany = (entity: string|(new(...args: any[]) => {})) =>
function(target: Object, key: string) {
  Easily(`${target.constructor.name}_Many`, <HasMany>{
    foreignKey: (typeof entity === "string")? entity: entity.name,
    localField: key
  })
}

export const belongsTo = (entity: string|(new(...args: any[]) => {})) =>
function(target: Object, key: string) {
  Easily(`${target.constructor.name}_Belongs`, <BelongsTo>{
    foreignKey:(typeof entity === "string")? entity: entity.name,
    localField: key
  })
}

export const beforeCreate = () => 
function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let stack = <Function[]>is(`${target.constructor.name}_Before_Create`) || []
  stack.push(target[propertyKey])
  Easily(`${target.constructor.name}_Before_Create`, stack)
}

export const afterCreate = () => 
function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let stack = <Function[]>is(`${target.constructor.name}_After_Create`) || []
  stack.push(target[propertyKey])
  Easily(`${target.constructor.name}_After_Create`, stack)
}

export const beforeUpdate = () => 
function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let stack = <Function[]>is(`${target.constructor.name}_Before_Update`) || []
  stack.push(target[propertyKey])
  Easily(`${target.constructor.name}_Before_Update`, stack)
}

export const afterUpdate = () => 
function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let stack = <Function[]>is(`${target.constructor.name}_After_Update`) || []
  stack.push(target[propertyKey])
  Easily(`${target.constructor.name}_After_Update`, stack)
}

export const beforeDelete = () => 
function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let stack = <Function[]>is(`${target.constructor.name}_Before_Delete`) || []
  stack.push(target[propertyKey])
  Easily(`${target.constructor.name}_Before_Delete`, stack)
}

export const afterDelete = () => 
function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let stack = <Function[]>is(`${target.constructor.name}_After_Delete`) || []
  stack.push(target[propertyKey])
  Easily(`${target.constructor.name}_After_Delete`, stack)
}
