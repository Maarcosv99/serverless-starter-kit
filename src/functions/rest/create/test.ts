import { UserFactory } from '@tests/factories'
import { main } from './handler'
import { createLambdaEvent, invokeLambda } from "@tests/setup/lambda"
import { DynamoDBSetupTest } from '@tests/setup/dynamodb'

const handler = main
const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

const eventPayload = (body: Record<string, any>) => {
  return createLambdaEvent({
    resource: '/user/create',
    path: '/user/create',
    httpMethod: 'POST',
    body: JSON.stringify(body)
  })
}

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterAll(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing user http create', () => {
  test('Create user with correct payload', async () => {
    const user = userFactory.generate_random()
    const payload = eventPayload(user)
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 201,
      body: { email: user.email }
    })
  })

  test('Create user without email', async () => {
    const user = userFactory.generate_random()
    const payload = eventPayload({ password: user.password })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: { errors: ["email is a required field"] }
    })
  })

  test('Create user without password', async () => {
    const user = userFactory.generate_random()
    const payload = eventPayload({ email: user.email })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: { errors: ["password is a required field"] }
    })
  })

  test('Create user with invalid email', async () => {
    const user = userFactory.generate_random()
    const payload = eventPayload({ email: 'test', password: user.password })
    const response = await invokeLambda(handler, payload)
    expect(response).toHaveProperty('statusCode', 404)
  })

  test('Create user with invalid password', async () => {
    const user = userFactory.generate_random()
    const payload = eventPayload({ email: user.email, password: '1234' })
    const response = await invokeLambda(handler, payload)
    expect(response).toHaveProperty('statusCode', 404)
  })
})