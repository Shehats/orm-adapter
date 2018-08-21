import { createSchema } from './helpers';
import { is, Easily } from 'easy-injectionjs';
import { Controller, BasicController } from '../controllers/controller';

export interface Routes {
  getUrl?: string,
  getByIdUrl?: string,
  getByKeyUrl?: string,
  postUrl?: string,
  putUrl?: string,
  deleteUrl?: string,
  queryUrl?: string,
  registerUrl?: string,
  loginUrl?: string,
  logoutUrl?: string
}

export interface ControllerConfig <U, T extends Controller<U>> {
  routes: Routes,
  controller: (new(...args: any[]) => T),
  target: (new(...args: any[]) => {}),
  entity: any
}

export const Entity = <T extends {new(...args: any[]):{}}> () => function(target: T) {
  const entity = <any>createSchema(target);
  entity.config({tableName: target.name});
  Easily(target.name+'_Entity', entity);
}

export const EntityController = <T extends {new(...args: any[]):{}}> (routes?: Routes) => function(target: T) {
  const entity = <any>createSchema(target);
  entity.config({tableName: target.name});
  Easily(target.name+'_Entity', entity);
  const targetRoutes: Routes = (routes) 
                    ? routes
                    : {
                      getUrl: target.name.toLowerCase(),
                      getByIdUrl: target.name.toLowerCase(),
                      getByKeyUrl: target.name.toLowerCase(),
                      postUrl: target.name.toLowerCase(),
                      putUrl: target.name.toLowerCase(),
                      deleteUrl: target.name.toLowerCase(),
                      queryUrl: target.name.toLowerCase()
                    }
  let controllersStack = <any[]>is('Controller_Queue') || [];
  let curn: ControllerConfig<T, BasicController<T>> = {
    routes: targetRoutes,
    controller: BasicController,
    target: target,
    entity: entity
  }
  controllersStack.push(curn);
  Easily('Controller_Stack', controllersStack);
}
