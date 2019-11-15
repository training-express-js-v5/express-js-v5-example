module.exports = {
  username: {
    type: 'string',
    example: 'tom99'
  },
  userEmail: {
    type: 'string',
    example: 'tom.engels@wolox.com.ar'
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      username: {
        $ref: '#/components/schemas/username'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      }
    }
  }
};
