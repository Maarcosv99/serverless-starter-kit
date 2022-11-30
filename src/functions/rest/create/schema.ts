import { object, string, SchemaOf } from 'yup'
import { UserCreate } from '@infrastructure/database/schemas/user'

export const schema: SchemaOf<UserCreate> = object({
    email: string().email().lowercase().required(),
    password: string().required().min(8)
})

export type schemaEvent = {
    body: UserCreate
}