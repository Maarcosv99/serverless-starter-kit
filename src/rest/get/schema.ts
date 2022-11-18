import { object, string, SchemaOf } from 'yup'

interface UserGet { email: string }

export const schema: SchemaOf<UserGet> = object({
  email: string().email().required().lowercase().transform((value: string) => value.toLowerCase())
})

export type schemaEvent = {
  queryStringParameters: UserGet
}