import { docClient } from '@infrastructure/database/setup/docClient'
import { User } from '@infrastructure/database/model/user'
import { PutCommand, } from '@aws-sdk/lib-dynamodb'

export async function create(user: User): Promise<User> {
    try {
        const params = {
            TableName: process.env.TABLE!,
            Item: user.toItem(),
            ConditionExpression: "attribute_not_exists(PK)"
        }
        await docClient.send(new PutCommand(params))
        return user
    } catch (error) {
        console.log(error)
        throw error
    }
}
