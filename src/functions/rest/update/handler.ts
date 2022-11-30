import { handler, HandlerFunction } from '@libraries/handler-function'
import { schema, schemaEvent } from './schema'
import { updateUser } from '@logic/update'

const http: HandlerFunction<schemaEvent> = async (event) => {
  return await updateUser(event.body)
}

export const main = handler(
  http, { body: schema }, []
)