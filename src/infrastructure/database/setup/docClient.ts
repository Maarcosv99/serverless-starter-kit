import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { client } from './client'

const marshallOptions = {
    // Convert empty strings, blobs and sets to `null`
    convertEmptyValues: false,
    // Remove undefined values
    removeUndefinedValues: true,
    // Convert typeof object to map attribute
    convertClassInstanceToMap: true
}

const unmarshallOptions = {
    // Return number as a string then converting to native number javascript
    wrapNumbers: true
}

const translateConfig = {
    marshallOptions, unmarshallOptions
}

export const docClient = DynamoDBDocumentClient.from(
    client,
    translateConfig
)
