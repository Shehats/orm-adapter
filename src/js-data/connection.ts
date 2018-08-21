import { GenericConnection, GenericConnector, Connection } from '../generics';

export class JSDataConnector extends GenericConnector {
  public connect(url: string, params: any, ...rest: any[]): Promise<Connection|any> {
    return Promise.resolve(new this.ConnectionFunc(params))
    .then(con => new GenericConnection(con))
    .catch(err => console.error(err));
  }
}
