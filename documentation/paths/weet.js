module.exports = {
  '/weets': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create weet',
      operationId: 'createWeet',
      security: [{ bearer: [] }],
      responses: {
        201: {
          description: 'Weet created'
        },
        500: {
          description: 'Default error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User´s email already exists',
                internal_code: 'invalid_parameters'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User is not authorized',
                internal_code: 'authentication_error'
              }
            }
          }
        },
        503: {
          description: 'Database error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Timeout connection error',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    }
  }
};
