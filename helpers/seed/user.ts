import { listRandomUsers } from "./user.generate"
import { User } from '@infrastructure/database/model/user'
import { CrudUser } from '@infrastructure/database/crud'

async function runSeeder() {
  const users = listRandomUsers(10)
  const crud = new CrudUser()
  const promises: Promise<any>[] = []
  users.forEach(user => {
    const instance_user = new User(user)
    promises.push(crud.create(instance_user))
  })
  await Promise.all(promises)
}

(async () => {
  await runSeeder()
})()
