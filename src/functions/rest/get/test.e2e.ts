import { UserFactory } from '@tests/factories'
import { main } from './handler'
import { createLambdaEvent, invokeLambda } from '@tests/setup/lambda'
import { DynamoDBSetupTest } from '@tests/setup/dynamodb'

const handler = main
const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

const eventPayload = (queryStringParameters: Record<string, any>) => {
  return createLambdaEvent({
    resource: '/user/search',
    path: '/user/search',
    httpMethod: 'GET',
    queryStringParameters: queryStringParameters
  })
}

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterEach(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing user http get', () => {
  test('Find user by correct email', async () => {
    const user = await userFactory.create()
    const payload = eventPayload({ email: user.email })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 200,
      body: {
        email: user.email
      }
    })
  })

  test('Find user by invalid email', async () => {
    const payload = eventPayload({ email: 'test' })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: { errors: ['email must be a valid email'] }
    })
  })

  test('Find user without email', async () => {
    const payload = eventPayload({})
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: { errors: ["email is a required field"] }
    })
  })
})
