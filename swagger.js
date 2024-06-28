const swaggerJsdoc = require('swagger-jsdoc')
require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Screenshot',
            version: '1.0.0',
            description: 'Cung cấp api chụp ảnh',
        }
    },
    apis: ['./app/routes/*.js', './app/controllers/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;