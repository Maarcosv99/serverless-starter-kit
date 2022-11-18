export interface BaseFactory<Crud, SchemaCreate> {
  crud: Crud
  generate_random(): SchemaCreate
  create(payload: SchemaCreate): Promise<Record<string, any>>
}