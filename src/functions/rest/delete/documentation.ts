export const documentation = {
    summary: 'Delete user',
    swaggerTags: ['User'],
    operationId: 'deleteUser',
    consumes: ['application/json'],
    produces: ['application/json'],
    bodyType: 'DeleteUserRequest',
    responseData: {
        204: {
            description: 'User deleted with success.'
        },
        400: {
            description: 'Could not delete user',
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
