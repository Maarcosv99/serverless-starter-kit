import { docClient } from '@infrastructure/database/setup/docClient'
import { User } from '@infrastructure/database/model/user'
import { UpdateCommand, } from '@aws-sdk/lib-dynamodb'
import { UserUpdate } from '@infrastructure/database/schemas/user'
import { mountExpression } from '@infrastructure/database/util/expression'

export async function update(email: string, payload: UserUpdate): Promise<void> {
    const user = new User({ email, password: '' })

    try {
        const {
            UpdateExpression,
            ExpressionAttributeValues,
            ExpressionAttributeNames
        } = mountExpression(payload)

        const params = {
            TableName: process.env.TABLE!,
            Key: user.keys(),
            ConditionExpression: "attribute_exists(PK)",
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues
        }
        await docClient.send(
            new UpdateCommand(params)
        )
    } catch (error) {
        console.log(error)
        throw error
    }
}
