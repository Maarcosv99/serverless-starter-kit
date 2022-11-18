import { listRandomUsers } from "./user.generate"
import { UserCrud } from '@infrastructure/database/crud/user'

async function runSeeder() {
  const users = listRandomUsers(10)
  const User = new UserCrud()
  const promises: Promise<any>[] = []
  users.forEach(user => promises.push(User._create(user)))
  await Promise.all(promises)
}

(async () => {
  await runSeeder()
})()