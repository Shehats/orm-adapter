import { Connection, GenericSchema } from '../generics/generic-schema';
import { DynamoEntity } from './dynamo-entity';
import { CommonEntity } from '../generics';

export class DynamoConnection implements Connection {
  protected _entities = {};
  protected _dynamo: any;

  constructor(dynamo: any) {
    this._dynamo = dynamo;
  }

  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T), object: GenericSchema): void {
    const entity = this._dynamo.define(target.name, object);
    entity.config({tableName: target.name});
    this._entities[target.name] = new DynamoEntity(entity,target);
  } 

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): CommonEntity {
    return <DynamoEntity>this._entities[target.name];
  }

}

