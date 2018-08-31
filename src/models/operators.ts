import { Repository } from '../generics';
import { is } from 'easy-injectionjs';

export const getRepository = <T extends {new(...args: any[]):{}}> (target: T): Repository => <Repository>is(`${target.name}_Repository`);
