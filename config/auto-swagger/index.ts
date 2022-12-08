export default {
    title: 'Service Typescript Example',
    generateSwaggerOnDeploy: true,
    excludeStages: ['prod', 'production'],
    apiType: 'http',
    apiKeyHeaders: ['Authorization'],
    swaggerPath: 'docs',
    basePath: '/',
    schemes: ['http', 'https'],
    typefiles: [
        './config/auto-swagger/types/base.d.ts',
        './config/auto-swagger/types/create.d.ts',
        './config/auto-swagger/types/get.d.ts',
        './config/auto-swagger/types/update.d.ts',
        './config/auto-swagger/types/delete.d.ts'
    ]
}
