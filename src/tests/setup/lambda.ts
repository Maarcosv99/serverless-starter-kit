import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { JsonValue } from 'type-fest'

interface Request {
  resource: string
  path: string
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  queryStringParameters?: APIGatewayProxyEvent["queryStringParameters"],
  multiValueQueryStringParameters?: APIGatewayProxyEvent["multiValueQueryStringParameters"],
  pathParameters?: APIGatewayProxyEvent["pathParameters"],
  body?: APIGatewayProxyEvent["body"] & JsonValue,
}

export interface ICreateLambdaEvent {
  event: any,
  context: Context
}

function createLambdaEvent(params: Request): ICreateLambdaEvent {
  const sampleEvent: APIGatewayProxyEvent & { rawBody: string } = {
    resource: params.resource,
    path: params.path,
    httpMethod: params.httpMethod,
    requestContext: {
      resourcePath: params.resource,
      httpMethod: params.httpMethod,
      path: params.path,
      accountId: 'x',
      apiId: 'y',
      authorizer: {},
      protocol: 'p',
      identity: {
        accessKey: '',
        accountId: '',
        apiKey: '',
        apiKeyId: '',
        caller: '',
        clientCert: null,
        cognitoAuthenticationProvider: '',
        cognitoAuthenticationType: '',
        cognitoIdentityId: '',
        cognitoIdentityPoolId: '',
        principalOrgId: '',
        sourceIp: '',
        user: '',
        userAgent: '',
        userArn: ''
      },
      stage: '',
      requestId: '',
      requestTimeEpoch: 12345567,
      resourceId: ''
    },
    headers: {
      accept: 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      Host: '70ixmpl4fl.execute-api.us-east-2.amazonaws.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      'X-Amzn-Trace-Id': 'Root=1-5e66d96f-7491f09xmpl79d18acf3d050',
      'Content-Type': 'application/json'
    },
    multiValueHeaders: {
      accept: [
        'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
      ],
      'accept-encoding': [
        'gzip, deflate, br'
      ]
    },
    queryStringParameters: params.queryStringParameters || {},
    multiValueQueryStringParameters: params.multiValueQueryStringParameters || {},
    pathParameters: params.pathParameters || {},
    stageVariables: {},
    body: params.body || '',
    rawBody: typeof params.body == 'string' ? params.body : JSON.stringify(params.body),
    isBase64Encoded: false
  }
  const sampleContext: Context & { timeoutEarlyResponse: Function, timeoutEarlyInMillis: number } = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '234',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: (): number => 1000,
    done: () => { },
    fail: (_) => { },
    succeed: () => { },
    timeoutEarlyResponse: () => {},
    timeoutEarlyInMillis: 0
  }

  return {
    event: sampleEvent as any,
context: sampleContext
  }
}

async function invokeLambda(handler: Function, payload: ICreateLambdaEvent): Promise<APIGatewayProxyResult> {
  return await handler(payload.event, payload.context, () => {})
}

export {
  createLambdaEvent,
  invokeLambda
}