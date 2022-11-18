export default {
  iam: {
    role: {
      statements: [{
        Effect: 'Allow',
        Action: [
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:Scan',
          'dynamodb:Query',
          'dynamodb:DescribeTable',
          'dynamodb:TransactGetItems',
          'dynamodb:TransactWriteItems',
          'dynamodb:UpdateItem',
          'dynamodb:UpdateTimeToLive',
          'dynamodb:DeleteItem',
          'dynamodb:BatchGetItem',
          'dynamodb:BatchWriteItem'
        ],
        Resource: [
          'arn:aws:dynamodb:${self:provider.environment.DYNAMODB_REGION}:*:table/${self:provider.environment.TABLE}'
        ]
      }]
    }
  }
}