import { UserFactory } from '@tests/factories'
import { main } from './handler'
import { createLambdaEvent, invokeLambda } from "@tests/setup/lambda"
import { DynamoDBSetupTest } from '@tests/setup/dynamodb'
import { getUser } from "@logic/get"

const handler = main
const dynamoDB = new DynamoDBSetupTest()
const userFactory = new UserFactory()

const eventPayload = (body: Record<string, any>) => {
  return createLambdaEvent({
    resource: '/user/update',
    path: '/user/update',
    httpMethod: 'PUT',
    body: JSON.stringify(body)
  })
}

beforeEach(async () => {
  await dynamoDB.createTable()
})

afterAll(async () => {
  await dynamoDB.deleteTable()
})

describe('Testing user http update', () => {
  test('Update user with correct schema', async () => {
    const user = await userFactory.create()
    const company_name = 'company test'
    const payload = eventPayload({ ...user, company_name })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 204,
      body: {}
    })

    let user_updated = await getUser(user.email)
    user_updated.body = JSON.parse(user_updated.body)
    expect(user_updated).toMatchObject({
      statusCode: 200,
      body: {
        email: user.email,
        company_name: company_name
      }
    })
  })

  test('Update user with more attributes than the schema', async () => {
    const user = await userFactory.create()
    const new_attribute = { first_name: 'Testing' }
    const payload = eventPayload({ ...user, ...new_attribute })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: {
        errors: ['company_name must be at least 2 characters']
      }
    })
    let user_updated = await getUser(user.email)
    user_updated.body = JSON.parse(user_updated.body)
    expect(user_updated).toMatchObject({
      statusCode: 200,
      body: {
        email: user.email
      }
    })
    expect(user_updated.body).toEqual(
      expect.not.objectContaining(new_attribute)
    )
  })

  test('Update user with invalid email', async () => {
    const payload = eventPayload({ email: 'test', company_name: 'Testing '})
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: { errors: ["email must be a valid email"] }
    })
  })

  test('Update user without email', async () => {
    const payload = eventPayload({ company_name: 'Testing' })
    let response = await invokeLambda(handler, payload)
    response.body = JSON.parse(response.body)
    expect(response).toMatchObject({
      statusCode: 404,
      body: { errors: ["email is a required field"] }
    })
  })
})
