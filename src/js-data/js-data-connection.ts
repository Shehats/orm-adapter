import { Connection, Connector, GenericConnection } from '../generics';
import { AdapterSchema } from './js-data-schema';

export class JSDataConnection extends GenericConnection {
  public putRepository<T extends {new(...args:any[]):{}}>(
    target: (new(...args:any[])=>T)|Function|string, object?: Object|any): void {}
}

export class JSDataConnector implements Connector {
  private _adapter: any;
  private _schema: any;
  private _store: any;
  constructor(
    Schema: any,
    Adapter: any,
    adapterConfig: AdapterSchema,
    Container: any) {
      this._adapter = new Adapter(adapterConfig);
      this._store = new Container();
      this._schema = Schema;
  }
  
  public connect(url: string, params: any, ...rest: any[]): Promise<Connection|any> {
    return null
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
