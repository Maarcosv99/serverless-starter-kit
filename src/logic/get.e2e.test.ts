import { UserFactory } from '@tests/factories'
import { getUser } from './get'
import { DynamoDBSetupTest } from "@tests/setup/dynamodb"

const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterEach(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing logic business get', () => {
  test('Get existent user', async () => {
    const user = await userFactory.create()
    let response = await getUser(user.email)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 200,
      body: {
        email: user.email
      }
    })
  })
})
