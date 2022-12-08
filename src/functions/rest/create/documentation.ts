export const documentation = {
    summary: 'Create user',
    swaggerTags: ['User'],
    operationId: 'postUser',
    consumes: ['application/json'],
    produces: ['application/json'],
    bodyType: 'CreateUserRequest',
    responseData: {
        200: {
            description: 'User created with success.',
            bodyType: 'CreateUserResponse'
        },
        400: {
            description: 'Could not create user',
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