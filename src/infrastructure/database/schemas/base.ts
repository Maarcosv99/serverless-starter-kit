type CompositeKey = {
  pk: string
  sk: string
  GSI1PK?: string
  GSI1SK?: string
  GSI2PK?: string
  GSI2SK?: string
}

interface BaseModel extends CompositeKey {}

interface BaseInDB extends CompositeKey {
  _ct: Date
  _mt: Date
  _et: string
}

export {
  CompositeKey,
  BaseModel,
  BaseInDB
}