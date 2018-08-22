import { CommonEntity } from '../generics';
import { JSDataSchema } from './js-data-schema';

export const createSchema = <T extends {new(...args:any[]):{}}> () => {

}

export class JsDataEntity implements CommonEntity {
  findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{}
  findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any{}
  findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any{}
  save <T extends {new(...args:any[]):{}}> (target: T|any){}
  update <T extends {new(...args:any[]):{}}> (target: T|any){}
  updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any){}
  delete <T extends {new(...args:any[]):{}}> (target: T|any){}
  deleteById (id: number|string|any) {}
}
