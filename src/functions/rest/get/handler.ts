import { handler, HandlerFunction } from '@libraries/handler-function'
import { schema, schemaEvent } from './schema'
import { getUser } from '@logic/get'

const http: HandlerFunction<schemaEvent> = async (event) => {
  return await getUser(event.queryStringParameters.email)
}

export const main = handler(
  http, { queryStringParameters: schema }, []
)