import { User } from '@infrastructure/database/model/user'
import { UserUpdate } from '@infrastructure/database/schemas/user'

import { create } from './methods/create'
import { update } from './methods/update'
import { get } from './methods/get'
import { remove } from './methods/remove'

export class CrudUser {
    async create(payload: User) {
        return await create(payload)
    }

    async update(email: string, payload: UserUpdate) {
        return await update(email, payload)
    }

    async get(email: string) {
        return await get(email)
    }

    async remove(email: string) {
        return await remove(email)
    }
}
