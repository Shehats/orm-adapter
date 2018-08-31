import { Repository } from "../generics";
import * as Joi from 'joi';
import { is } from "easy-injectionjs";
import { OrmConfig } from "../models";

export const createDynamoType = (config: string, type: string, dynamo: any) =>
(type === 'String' && config === 'email') ? Joi.string().email(): (type === 'String') ? Joi.string()
: (type === 'Number')? Joi.number()
: (config.toLowerCase() === 'string' && type === 'Array') ? dynamo.types.stringSet() : (type === 'Array')
? dynamo.types.numberSet()
: (type === 'Boolean') ? Joi.boolean()
: (type === 'Date') ? Joi.date(): dynamo.types.uuid()

export interface DynamoConfig extends OrmConfig {
  configPath: string,
  dynamo: any,
  AWS: any,
  dynamoConfig?: any
}

export class DynamoRepository implements Repository {
  protected _entity: any;
  protected _target: (new(...args: any[]) => {});
  constructor(entity: any, target: (new(...args: any[]) => {})) {
    this._entity = entity;
    this._target = target;
  }
  public findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{
    return this._entity.scan().loadAll().exec();
  }
  public findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any{
    return this._entity.query(id).exec();
  }
  public findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any{
    return this._entity.query(params).exec();
  }
  public save <T extends {new(...args:any[]):{}}> (target: T|any){
    return this._entity.create(target);
  }
  public update <T extends {new(...args:any[]):{}}> (target: T|any){
    return this._entity.update(target);
  }
  public updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any){
    return this.update(target);
  }
  public delete <T extends {new(...args:any[]):{}}> (target: T|any){
    return this.deleteById(target[<number>is(`${this._target.name}_ID`)]);
  }
  public deleteById (id: number|string|any) {
    return this._entity.delete(id);
  }
}
