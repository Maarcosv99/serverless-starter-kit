import { UserFactory } from '@tests/factories'
import { DynamoDBSetupTest } from '@tests/setup/dynamodb'

const dynamoDB = new DynamoDBSetupTest()
const accountFactory = new UserFactory()

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterEach(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing account crud', () => {
  test('Test partition key and sort key after transform', async () => {
    const payload = accountFactory.generate_random()
    const { pk, sk } = await accountFactory.create(payload)
    const KEY = `user#${payload.email.toLowerCase()}`
    expect(pk).toBe(KEY)
    expect(sk).toBe(KEY)
  })
})