import { Repository } from "../generics";
import { BookShelfSchema } from "./book-shelf-schema";
import * as Joi from 'joi';
import { Field } from "../models";

export const createBookShelfType = (type: string, config?: string) =>
(type === 'String' && config === 'email') 
? Joi.string().email()
: (type === 'String') ? Joi.string()
: (type === 'Number')? Joi.number()
: (type === 'Boolean') 
? Joi.boolean()
: Joi.date()

export const createBookShelfSchema = <T extends {new(...args: any[]):{}}>(target: T, fields: Field[]): BookShelfSchema => {
  return <BookShelfSchema> {
    tableName: target.name,
    validate: fields.reduce((field: Field, dict) => (
      {...dict, [field.name]: createBookShelfType(field.type)}
    ), {})
  }
}

export class BookShelfRepository implements Repository {
  private _entity: any;

  constructor(entity: any) {
    this._entity = entity;
  }
  public findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{
    return this._entity.findAll();
  }
  public findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any{
    return this._entity.findOne({id: id})
  }
  public findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any{
    return this._entity.findOne(params, {require: true});
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
    return this._entity.destroy({id: target['id']});
  }
  public deleteById (id: number|string|any) {
    return this._entity.destroy({id: id});
  }
}