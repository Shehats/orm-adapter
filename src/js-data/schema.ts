import { GenericSchema, SchemaField } from '../generics';

export interface JSDataSchema extends GenericSchema {
  type: string,
  name: string,
  properties: Object|Function|any,
  $schema?: string,
  title?: string,
  description?: string,
  hasMany?: Object|Function|any,
  belongsTo?: Object|Function|any
}

export interface DataSchemaField extends SchemaField {
  type: string,
  indexed?: boolean,
  endpoint?: string
}