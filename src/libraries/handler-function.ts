import middy from "@middy/core"
import { jsonBodyParser, schemaValidator, Validator } from '@libraries/middlewares'

type BaseRecord = {
  [key: string]: any
}

type HttpEvent<T> = {
  body: BaseRecord,
  queryStringParameters: BaseRecord
} & T

type HttpResult = {
  statusCode: number,
  body: string | Record<string, any>
}

type Middleware = {
  before?: (request: any) => Promise<HttpResult | any>,
  after?: (request: any) => Promise<HttpResult | any>
}

type HandlerFunction<T> = (event: HttpEvent<T>) => Promise<HttpResult>

const handler = <Schema>(
  handlerFunction: (event: HttpEvent<Schema>) => Promise<HttpResult>,
  validator: Validator = {},
  middlewares: Middleware[] = []
) => {
  const main = middy(handlerFunction)
    .use(jsonBodyParser())
    .use(schemaValidator(validator))
  middlewares.forEach(middleware => main.use(middleware))
  return main
}

export {
  handler,
  HandlerFunction
}