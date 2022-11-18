import { client } from './dynamodb'
import { Table } from 'dynamodb-onetable'
import { schema } from './schema'

export const table = new Table<typeof schema>({
  client: client,
  name: process.env.TABLE!,
  schema: schema,
  partial: true,
  logger: true,
  transform(model, operation, item, properties, params, raw) {
    if (operation == 'write') {
      item.email = properties.email.toLowerCase()
    }
    return item
  }
} as const)