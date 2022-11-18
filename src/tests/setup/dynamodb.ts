import { Table } from 'dynamodb-onetable'
import { table } from '@infrastructure/database/setup/table'

class DynamoDBSetupTest {
  table: Table

  constructor() {
    this.table = table
  }

  async createTable() {
    if (!await this.table.exists()) {
      await this.table.createTable()
    }
  }

  async deleteTable() {
    await this.table.deleteTable('DeleteTableForever')
  }

  async cleanTable() {
    await this.deleteTable()
    await this.createTable()
  }
}

export {
  DynamoDBSetupTest
}