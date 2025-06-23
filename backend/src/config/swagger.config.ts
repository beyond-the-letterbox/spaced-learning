export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Spaced Learning API',
            version: '1.0.0',
            description: 'API for spaced learning project'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};
