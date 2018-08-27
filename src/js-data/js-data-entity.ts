import { CommonEntity } from '../generics';
import { JSDataSchema, JSDataSchemaField } from './js-data-schema';
import { is, Easily } from 'easy-injectionjs';

export const createJSDataField = (type: string, indexed?: boolean): JSDataSchemaField => {
  return <JSDataSchemaField>((type === 'String')
    ? { type: 'string', indexed } : (type === 'Number')
    ? { type: 'number', indexed } : (type === 'Boolean')
    ? { type: 'boolean', indexed } : (type === 'Date')
    ? { type: 'date', indexed } : { type: 'string', indexed })
}

export const createJSDataSchemaProperties = (id: number|string, fields: any[]): any => {
  const properties = {id: id};
  fields.forEach(x => {
    properties[x.name] = x.field
  });
  return properties;
}

export const setJSDataId = (target: string)=> {
  Easily(target+'_ID', createJSDataField(is(target+'_ID')));
}

export const getJSDataId = (target: (new(...args: any[]) => {})): number|string => {
  return is(target.name+'_ID')
}

export class JsDataEntity implements CommonEntity {
  private _store: any;
  private _entity: (new(...args: any[]) => {});
  constructor(store: any, entity: (new(...args: any[]) => {})) {
    this._store = store;
    this._entity = entity;
  }
  public findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{
    return this._store.findAll(this._entity.name);
  }
  public findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any{
    return this._store.find(this._entity.name, id);
  }
  public findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any{
    return this._store.findAll(this._entity.name, params);
  }
  public save <T extends {new(...args:any[]):{}}> (target: T|any){
    return this._store.create(this._entity.name, target);
  }
  public update <T extends {new(...args:any[]):{}}> (target: T|any){
    return this.updateById(target[getJSDataId(target)], target);
  }
  public updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any){
    return this._store.update(this._entity.name, id, target);
  }
  public delete <T extends {new(...args:any[]):{}}> (target: T|any){
    return this.deleteById(target[getJSDataId(target)]);
  }
  public deleteById (id: number|string|any) {
    return this._store.destroy(this._entity.name, id);
  }
}
