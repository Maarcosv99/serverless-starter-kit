import { docClient } from '@infrastructure/database/setup/docClient'
import { User } from '@infrastructure/database/model/user'
import { DeleteCommand } from '@aws-sdk/lib-dynamodb'

export async function remove(email: string): Promise<void> {
    const user = new User({ email, password: '' })

    try {
        const params = {
            TableName: process.env.TABLE!,
            Key: user.keys()
        }
        await docClient.send(
            new DeleteCommand(params)
        )
    } catch(error) {
        console.log(error)
        throw error
    }
}
