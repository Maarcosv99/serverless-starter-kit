import { handler, HandlerFunction } from '@libraries/handler-function'

import { schema, schemaEvent } from './schema'
import { deleteUser } from '@logic/delete'

const http: HandlerFunction<schemaEvent> = async (event) => {
  return await deleteUser(event.body.email)
}

export const main = handler(
  http, { body: schema }, []
)