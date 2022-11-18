import {BaseSchema} from "yup";
import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

type MiddlewareObj = middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult>
type MiddlewareFn = middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult>

export const jsonBodyParser = (): MiddlewareObj => {
  const before: MiddlewareFn = async (request): Promise<void> => {
    const { headers , body  } = request.event;
    const contentType = headers['Content-Type'] || headers['content-type']
    if (!contentType || contentType.search('application/json') < 0) return;
    try {
      if (body) request.event.body = JSON.parse(body)
    } catch (error) {
      throw error
    }
  }

  return {
    before
  }
}

export interface Validator {
  body?: BaseSchema
  queryStringParameters?: BaseSchema
}

export const schemaValidator = (schema: Validator) => {
  const before = async request => {
    try {
      const { body, queryStringParameters } = request.event;
      if (schema.body) schema.body.validateSync(body)
      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(
            queryStringParameters ?? {}
        )
      }
      return Promise.resolve()
    } catch (e) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          errors: e.errors
        })
      }
    }
  }
  return {
    before
  }
}