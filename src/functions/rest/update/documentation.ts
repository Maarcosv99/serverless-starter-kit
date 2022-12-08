export const documentation = {
    summary: 'Update user',
    swaggerTags: ['User'],
    operationId: 'putUser',
    consumes: ['application/json'],
    produces: ['application/json'],
    bodyType: 'UpdateUserRequest',
    responseData: {
        204: {
            description: 'User updated with success.',
        },
        400: {
            description: 'Could not find or update user.',
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
