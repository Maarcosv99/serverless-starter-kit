import { handler, HandlerFunction } from '@libraries/handler-function'
import { schema, schemaEvent } from './schema'
import { updateUser } from '@logic/update'

const http: HandlerFunction<schemaEvent> = async (event) => {
    return await updateUser(event.body.email, {
        password: event.body.password,
        company_name: event.body.company_name
    })
}

export const main = handler(
  http, { body: schema }, []
)
