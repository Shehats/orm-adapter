import { Easily, is } from 'easy-injectionjs';
import { registerField } from './helpers';

export const column = (params?: string | any | any[]) => 
function (target: Object, key: string) {
  registerField(<Function>target, key, params);
}

export const id = (params?: string | any | any[]) => 
function (target: Object, key: string) {
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
