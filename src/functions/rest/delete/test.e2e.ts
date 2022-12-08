import { UserFactory } from '@tests/factories'
import { main } from './handler'
import { createLambdaEvent, invokeLambda } from "@tests/setup/lambda"
import { DynamoDBSetupTest } from '@tests/setup/dynamodb'

const handler = main
const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

const eventPayload = (body: Record<string, any>) => {
  return createLambdaEvent({
    resource: '/user/delete',
    path: '/user/delete',
    httpMethod: 'DELETE',
    body: JSON.stringify(body)
  })
}

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterAll(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing user http delete', () => {
  test('Delete user existent', async () => {
    const user = await userFactory.create()
    const payload = eventPayload({ email: user.email })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 204,
      body: {}
    })
  })

  test('Delete user without email', async () => {
    const payload = eventPayload({ })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: {errors:["email is a required field"]}
    })
  })

  test('Delete user with invalid email', async () => {
    const payload = eventPayload({ email: 'test' })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: {errors:["email must be a valid email"]}
    })
  })
})