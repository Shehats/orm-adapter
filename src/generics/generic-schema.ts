export interface GenericSchema {
  name: string,
  schema: Function|Object|any
  id?: number|string|any,
  hashKey?: number|string|any,
  rangeKey?: number|string|any
}

export interface SchemaField {
}