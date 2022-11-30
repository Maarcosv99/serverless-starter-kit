import type { AWS } from '@serverless/typescript';

import { DynamoDBResources, DynamoDBIamRole } from '@config/dynamodb'
import { rests } from '@functions/rest'

const serverlessConfiguration: AWS = {
  service: 'serverless-typescript',
  frameworkVersion: '3',
  plugins: [
    'serverless-localstack',
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'sa-east-1',
    stage: '${opt:stage, "dev"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    ...DynamoDBIamRole,
    environment: {
      LOCALSTACK_HOST: "${env:LOCALSTACK_HOST, 'localstack'}",
      DYNAMODB_ENDPOINT: "${env:DYNAMODB_ENDPOINT, 'http://localstack:4566'}",
      DYNAMODB_PORT: "${env:DYNAMODB_ENDPOINT, '4566'}",
      DYNAMODB_REGION: "${env:DYNAMODB_REGION, 'sa-east-1'}",
      TABLE: "${env:TABLE, 'ExampleTable'}",
      IS_OFFLINE: "${env:IS_OFFLINE, 'false'}"
    }
  },
  functions: { ...rests },
  package: {
    individually: true,
    excludeDevDependencies: true
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ['*'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 8
    },
    localstack: {
      stages: ['local'],
      host: 'http://localstack',
      edgePort: 4566,
    },
    'serverless-offline': {
      useChildProcesses: true
    }
  },
  resources: {
    Resources: {
      ...DynamoDBResources
    }
  }
};

module.exports = serverlessConfiguration