import { handler, HandlerFunction } from '@libraries/handler-function'

import { schema, schemaEvent } from './schema'
import { createUser } from '@logic/create'

const http: HandlerFunction<schemaEvent> = async (event) => {
  return await createUser(event.body)
}

export const main = handler(
  http, { body: schema }, []
)