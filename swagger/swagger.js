export let swaggerOption = {
    swaggerDefinition: {
        info: {
            description: 'API to manage a user persistence layer.',
            title: 'Web Development API Task',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/api',
        produces: [
            "application/json"
        ],
        schemes: ['http']
    },
    basedir: __dirname, //app absolute path
    files: ['../routes/**/*.js'] //Path to the API handle folder
};