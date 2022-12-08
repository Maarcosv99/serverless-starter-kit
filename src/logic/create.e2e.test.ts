import { UserFactory } from '@tests/factories'
import { createUser } from './create'
import { DynamoDBSetupTest } from "@tests/setup/dynamodb"

const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterAll(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing logic business create', () => {
  test('Create user with correct payload', async () => {
    const user = userFactory.generate_random()
    let response = await createUser(user)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 201,
      body: {email: user.email}
    })
  })
})