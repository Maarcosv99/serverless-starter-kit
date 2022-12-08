import { UserFactory } from '@tests/factories'
import { updateUser } from './update'
import { DynamoDBSetupTest } from "@tests/setup/dynamodb"

const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterEach(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing logic business update', () => {
  test('Update existent user', async () => {
    const user = await userFactory.create()
    const new_attribute = { company_name: 'Test company'}
    let response = await updateUser(user.email, { ...new_attribute })
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 204,
      body: {}
    })
  })
})
