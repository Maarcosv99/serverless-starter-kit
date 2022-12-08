export const documentation = {
    summary: 'Get user',
    swaggerTags: ['User'],
    operationId: 'getUser',
    consumes: ['application/json'],
    produces: ['application/json'],
    queryStringParameters: {
        email: {
            required: true,
            type: 'string',
            description: 'Email of user'
        }
    },
    responseData: {
        200: {
            description: 'Found the user successfully.',
            bodyType: 'GetUserResponse'
        },
        400: {
            description: 'Could not find user',
            bodyType: 'BaseErrorResponse'
        },
        404: {
            description: 'Invalid body',
            bodyType: 'BaseErrorResponse'
        },
        500: {
            description: 'Server error',
            bodyType: 'BaseErrorResponse'
        }
    }
}
