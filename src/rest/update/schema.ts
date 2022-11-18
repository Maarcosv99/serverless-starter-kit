import { object, string, SchemaOf } from 'yup'
import { UserUpdate } from '@infrastructure/database/schemas/user'

export const schema: SchemaOf<UserUpdate> = object({
  email: string().email().required().lowercase().transform((value: string) => value.toLowerCase()),
  password: string().min(8),
  company_name: string().min(2)
})

export type schemaEvent = {
  body: UserUpdate
}