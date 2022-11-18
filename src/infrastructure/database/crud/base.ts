import {Entity, OneModel, Model, Table} from 'dynamodb-onetable'
import { table } from '../setup/table'
import { models } from '../models'

class BaseCrud<ModelDB extends OneModel, Create, Update> {
  protected readonly table: Table
  protected readonly model: Model<Entity<ModelDB>>

  constructor(entity: keyof typeof models, _table: Table = table) {
    this.table = _table
    this.model = table.getModel(entity) as Model<Entity<ModelDB>>
  }

  public async _create(payload: Create): Promise<Entity<ModelDB>> {
    return await this.model.create(payload as any)
  }

  public async _update(payload: Update): Promise<Entity<ModelDB>> {
    return await this.model.update(payload as any)
  }

  public async _remove(query: Record<string, any>): Promise<boolean> {
    await this.model.remove(query as any)
    return true
  }
}

export {
  BaseCrud
}