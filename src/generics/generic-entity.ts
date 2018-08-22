export interface CommonEntity {
  findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any;
  findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any;
  findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any;
  save <T extends {new(...args:any[]):{}}> (target: T|any);
  update <T extends {new(...args:any[]):{}}> (target: T|any);
  updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any);
  delete <T extends {new(...args:any[]):{}}> (target: T|any);
  deleteById (id: number|string|any);
}

export class GenericEntity {
  private _entity: (new(...args: any[]) => {})|Object|any;
  private _connectionApi: Function|Object|any;

  constructor (entity: (new(...args: any[]) => {})|Object|any, connectionApi: Function|Object|any) {
    this._entity = entity;
    this._connectionApi = connectionApi;
  }

  public findAll <T extends {new(...args:any[]):{}}> ():T[]|any[]|any{
    return this._connectionApi.findAll();
  }

  public findById <T extends {new(...args:any[]):{}}> (id: number|string|any): T|any {
    return this._connectionApi.findById(id);
  }

  public findOne <T extends {new(...args:any[]):{}}> (params: Object|any): T|any {
    return this._connectionApi.findOne(params);
  }

  public save <T extends {new(...args:any[]):{}}> (target: T|any) {
    return this._connectionApi.save(target);
  }

  public update <T extends {new(...args:any[]):{}}> (target: T|any) {
    return (this._connectionApi.update)
    ? this._connectionApi.update(target)
    : this.save(target);
  }

  public updateById <T extends {new(...args:any[]):{}}> (id: number|string|any, 
    target: T|any) {
    if (this._connectionApi.updateById)
      return this._connectionApi.updateById(id, target);
    let data = this.findById(id)
    return this.update(data);
  }

  public delete <T extends {new(...args:any[]):{}}> (target: T|any) {
    return this._connectionApi.delete(target);
  }

  public deleteById (id: number|string|any) {
    if (this._connectionApi.deleteById)
      return this._connectionApi.deleteById(id)
    let data = this.findById(id)
    return this.delete(data);
  }
}