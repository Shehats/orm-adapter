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

export const hasMany = (entity: string) =>
function(target: Object, key: string) {
  Easily(`${target.constructor.name}_Many`, <HasMany>{
    foreignKey: entity,
    localField: key
  })
}

export const belongsTo = (entity: string) =>
function(target: Object, key: string) {
  Easily(`${target.constructor.name}_Belongs`, <BelongsTo>{
    foreignKey: entity,
    localField: key
  })
}
