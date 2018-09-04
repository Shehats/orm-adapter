import { Repository } from '../generics/generic-repository';
import { is } from 'easy-injectionjs';

export class MongooseRepository implements Repository {
  private _entity: any;
  constructor(entity: any) {
    this._entity = entity;
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
    return data.save();
  }
  public update <T extends {new(...args:any[]):{}}> (target: T|any){
    return this._entity.update({[<string>is(`${target.name}_ID`)]:target[<string>is(`${target.name}_ID`)]},target)
  }
  public updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any){
    return this._entity.findByIdAndUpdate(id, target);
  }
  public delete <T extends {new(...args:any[]):{}}> (target: T|any){
    return this._entity.remove(target)
  }
  public deleteById (id: number|string|any) {
    return this._entity.findByIdAndRemove(id);
  }
}
