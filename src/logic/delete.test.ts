import { UserFactory } from '@tests/factories'
import { deleteUser } from './delete'
import { DynamoDBSetupTest } from "@tests/setup/dynamodb"

const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterAll(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing logic business delete', () => {
  test('Delete existent user', async () => {
    const user = await userFactory.create()
    let response = await deleteUser(user.email)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 204,
      body: {}
    })
  })
})