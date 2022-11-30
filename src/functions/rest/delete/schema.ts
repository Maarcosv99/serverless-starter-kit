import { object, string, SchemaOf } from 'yup'

interface UserDelete { email: string }

export const schema: SchemaOf<UserDelete> = object({
  email: string().email().required().lowercase().transform((value: string) => value.toLowerCase())
})

export type schemaEvent = {
  body: UserDelete
}