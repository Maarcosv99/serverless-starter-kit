import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import Dynamo from 'dynamodb-onetable/Dynamo'

export const client = new Dynamo({
  client: new DynamoDBClient(process.env.IS_OFFLINE == 'true'
    ? {region: process.env.DYNAMODB_REGION, endpoint: process.env.DYNAMODB_ENDPOINT}
    : {

    }
  )
})