import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export const client = new DynamoDBClient(process.env.IS_OFFLINE == 'true'
    ? {
        region: process.env.DYNAMODB_REGION,
        endpoint: process.env.DYNAMODB_ENDPOINT
    }
    : {}
)
