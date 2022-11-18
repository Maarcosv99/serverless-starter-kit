import { OneSchema } from 'dynamodb-onetable'
import { models } from '../models'

export const schema: OneSchema = {
  version: '0.0.1',
    indexes: {
    primary: { hash: 'pk', sort: 'sk' },
    GSI1: { hash: 'GSI1PK', sort: 'GSI1SK', follow: true },
    GSI2: { hash: 'GSI2PK', sort: 'GSI2SK', follow: true }
  },
  params: {
    isoDates: true,
    timestamps: true,
    createdField: '_ct',
    updatedField: '_mt',
    typeField: '_et',
  },
  models: models
} as const