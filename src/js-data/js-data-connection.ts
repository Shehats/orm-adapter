import { Connection, Connector, GenericConnection } from '../generics';
import { AdapterSchema } from './js-data-schema';
import { is } from 'easy-injectionjs';
import { setJSDataId, createJSDataSchemaProperties, JsDataEntity } from './js-data-entity';
import { CommonEntity } from '../generics/generic-entity';
import { Field } from '../models/helpers';

export class JSDataConnection implements Connection {
  private _schema: any;
  private _store: any;
  private _entities: any = {};
  private static instance: JSDataConnection = null;

  private constructor(store: Function|Object|any,
                      schema: Function|Object|any) {
    this._schema = schema;
    this._store = store;
  }

  public static create(store: Function|Object|any, schema: Function|Object|any) {
    return this.instance || (this.instance = new JSDataConnection(store, schema));
  }
 
  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T), object?: Object|any): void {
      setJSDataId(target.name);
      let id = <number|string>is(target.name+'_ID');
      let fields = <Field[]>is(target.name+'_Fields');
      let properties = createJSDataSchemaProperties(id, fields);
      const schema = new this._schema({
        type: 'object',
        title: target.name,
        properties: properties
      });
      this._store.defineMapper(target.name, {
        table: `${target.name}s`,
        schema: schema
      })
      this._entities[target.name] = new JsDataEntity(this._store, target);
  }

  public getRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)): CommonEntity {
    return this._entities[target.name]
  }
}

export class JSDataConnector implements Connector {
  private _adapter: any;
  private _schema: any;
  private _store: any;
  constructor(
    Schema: any,
    Adapter: any,
    adapterConfig: AdapterSchema,
    adapterName: string,
    Container: any) {
      this._adapter = new Adapter(adapterConfig);
      this._store = new Container();
      this._store.registerAdapter(adapterName, this._adapter, { 'default': true });
      this._schema = Schema;
  }
  
  public connect(url?: string, params?: any, ...rest: any[]): Promise<Connection|any> {
    return Promise.resolve(JSDataConnection.create(this._store, this._schema));
  }

  public get ConnectionFunc() {
    return this._store;
  }

  public set ConnectionFunc(connectionFunction: Function|any) {
    this._store = connectionFunction;
  }

  public get ConnectionApi() {
    return this._adapter;
  }

  public set ConnectionApi(connectionApi: Function|Object|any) {
    this._adapter = connectionApi;
  }
}
