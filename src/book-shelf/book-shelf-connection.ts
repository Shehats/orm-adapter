import { Connection, Connector } from "../generics";
import { is } from 'easy-injectionjs';
import { Field } from "../models";
import { createBookShelfSchema, BookShelfRepository } from "./book-shelf-repository";

export class BookShelfConnection implements Connection {
  private _entities: any;
  private _modelBase: any;
  private static _instance: BookShelfConnection = null;
  constructor (bookShelf: any, modelBase: any) {
    this._modelBase = modelBase(bookShelf)
    bookShelf.plugin(modelBase.pluggable)
    this._entities = {};
  }

  public static create (bookShelf: any, modelBase: any) {
    return this._instance || (this._instance = new this(bookShelf, modelBase))
  }
  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T), object?: Object|any): void {
      let id = <number|string>is(target.name+'_ID');
      let fields = <Field[]>is(target.name+'_Fields');
      let enttity = this._modelBase.extend(createBookShelfSchema(target, fields))
      this._entities[target.name] = new BookShelfRepository(enttity)
  }

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): BookShelfRepository {
    return this._entities[target.name]
  }
}

/* TODO
export class BookShelfConnector implements Connector {

}*/
