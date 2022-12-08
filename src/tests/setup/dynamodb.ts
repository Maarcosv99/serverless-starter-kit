import { client } from '@infrastructure/database/setup/client'
import {
    CreateTableCommand,
    DeleteTableCommand,
    DescribeTableCommand
} from '@aws-sdk/client-dynamodb'
import { DynamoDBResources } from '@config/dynamodb'


class DynamoDBSetupTest {
    async exists(): Promise<boolean> {
        try {
            await client.send(
                new DescribeTableCommand({
                    TableName: process.env.TABLE!
                })
            )
            return true
        } catch {
            return false
        }
    }

    async createTable(): Promise<void> {
        if (!await this.exists()) {
            await client.send(
                new CreateTableCommand({
                    ...DynamoDBResources.Table.Properties,
                    TableName: process.env.TABLE!
                })
            )
        }
    }

    async deleteTable(): Promise<void>  {
        await client.send(
            new DeleteTableCommand({
                TableName: process.env.TABLE!
            })
        )
    }
}

export {
  DynamoDBSetupTest
}
