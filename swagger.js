const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogging API',
      version: '1.0.0',
      description: 'API documentation for the Blogging API'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js'], // You can add JSDoc comments to your route files for more detail
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;