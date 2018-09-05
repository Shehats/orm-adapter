import { Repository } from '../generics/generic-repository';
import { is } from 'easy-injectionjs';
import { maybeHookCreate, maybeHookUpdate, maybeHookDelete } from '../models/operators';

export class MongooseRepository implements Repository {
  protected _entity: any;
  protected _target: (new(...args: any[]) => {});

  constructor(entity: any, target: (new(...args: any[]) => {})) {
    this._entity = entity;
    this._target = target;
  }

  public findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{
    return this._entity.find({})
  }

  public findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any{
    return this._entity.findById(id)
  }

  public findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any{
    return this._entity.findOne(params)
  }

  public save <T extends {new(...args:any[]):{}}> (target: T|any){
    let data = new this._entity(target)
    return maybeHookCreate(this._target.name, () => data.save());
  }

  public update <T extends {new(...args:any[]):{}}> (target: T|any){
    return maybeHookUpdate(this._target.name, () => this._entity.update({[<string>is(`${target.name}_ID`)]:target[<string>is(`${target.name}_ID`)]},target));
  }

  public updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any){
    return maybeHookUpdate(this._target.name, () => this._entity.findByIdAndUpdate(id, target));
  }

  public delete <T extends {new(...args:any[]):{}}> (target: T|any){
    return maybeHookDelete(this._target.name, () => this._entity.remove(target));
  }

  public deleteById (id: number|string|any) {
    return maybeHookDelete(this._target.name, () => this._entity.findByIdAndRemove(id));
  }
}
