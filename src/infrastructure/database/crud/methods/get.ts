import { docClient } from '@infrastructure/database/setup/docClient'
import { User } from '@infrastructure/database/model/user'
import { GetCommand, } from '@aws-sdk/lib-dynamodb'

export async function get(email: string): Promise<User | null> {
    const user = new User({ email, password: ''})

    try {
        const params = {
            TableName: process.env.TABLE!,
            Key: user.keys()
        }
        const { Item } = await docClient.send(
            new GetCommand(params)
        )
        
        return Item ? User.fromItem(Item) : null
    } catch(error) {
        console.log(error)
        throw error
    }
}
