import { GenericSchema, SchemaField } from '../generics';

export interface HasMany {
  foreignKey: string,
  localField: string
}

export interface BelongsTo {
  foreignKey: string,
  localField: string
}

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

export interface JSDataSchemaField extends SchemaField {
  type: string,
  indexed?: boolean,
  endpoint?: string
}

export interface MapperSchema {
  table: string,
  schema: JSDataSchema,
  endpoint?: string
}

export interface AdapterSchema {
  debug?: boolean,
  uri?: string,
  knexOpts?: Object|any
}
