import { Connection, Connector } from "../generics";
import { is, Easily } from 'easy-injectionjs';
import { Field } from "../models";
import { createBookShelfSchema, BookShelfRepository } from "./book-shelf-repository";
import { BookShelfConfig } from './book-shelf-schema';

export class BookShelfConnection implements Connection {
  private _entities: any;
  private _modelBase: any;
  private static _instance: BookShelfConnection = null;
  private constructor (modelBase: any) {
    this._modelBase = modelBase;
    this._entities = {};
  }

  public static create (modelBase: any) {
    return this._instance || (this._instance = new this(modelBase))
  }
  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T), object?: Object|any): void {
      let fields = <Field[]>is(target.name+'_Fields');
      let enttity = this._modelBase.extend(createBookShelfSchema(target, fields))
      this._entities[target.name] = new BookShelfRepository(enttity, target)
  }

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): BookShelfRepository {
    return this._entities[target.name]
  }
}


export class BookShelfConnector implements Connector {
  private _modelBase: any;
  constructor (config: BookShelfConfig) {
    config.bookShelf = config.bookShelf(config.kneex(config.kneexSchema))
    this._modelBase = config.modelBase(config.bookShelf)
    config.bookShelf.plugin(config.modelBase)
    config.plugins.forEach(plugin => {
      config.bookShelf.plugin(plugin)
    })
    Easily('BookShelf_Connector', this);
  }

  public connect(): Promise<Connection|any> {
    return Promise.resolve(BookShelfConnection.create(this._modelBase))
  }

  public get ConnectionFunc() {
    return this._modelBase;
  }

  public set ConnectionFunc(connectionFunction: Function|any) {
    this._modelBase = connectionFunction;
  }

  public get ConnectionApi() {
    return this._modelBase;
  }

  public set ConnectionApi(connectionApi: Function|Object|any) {
    this._modelBase = connectionApi;
  }
}
