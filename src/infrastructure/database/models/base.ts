import { OneField } from 'dynamodb-onetable'

type Model<Schema> = {
  [Properties in keyof Schema]: OneField
}

function createModel<Schema>(model: Model<Schema>): Record<string, any> {
  return model as Record<string, any>
}

export {
  createModel
}