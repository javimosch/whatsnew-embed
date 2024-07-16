// swagger-spec.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'News API',
    version: '1.0.0',
    description: 'API for managing news items',
  },
  servers: [
    {
      url: `http://localhost:${global.PORT||3000}/api`,
      description: 'Local server',
    },
    {
      url: 'https://geo-news-service.dev.intrane.fr/api',
      description: 'Staging server',
    },
  ],
  paths: {
    '/news': {
      post: {
        summary: 'Create a new news item',
        tags: ['News'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/News',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'News item created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/News',
                },
              },
            },
          },
          '400': {
            description: 'Invalid input',
          },
        },
      },
      get: {
        summary: 'Retrieve a list of news items',
        tags: ['News'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
            },
            description: 'The page number',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
            },
            description: 'The number of items per page',
          },
          {
            in: 'query',
            name: 'showArchived',
            schema: {
              type: 'boolean',
            },
            description: 'Whether to show archived items',
          },
        ],
        responses: {
          '200': {
            description: 'A list of news items',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    news: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/News',
                      },
                    },
                    currentPage: {
                      type: 'integer',
                    },
                    totalPages: {
                      type: 'integer',
                    },
                    totalItems: {
                      type: 'integer',
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/news/active': {
      get: {
        summary: 'Retrieve active news items',
        tags: ['News'],
        responses: {
          '200': {
            description: 'A list of active news items',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/News',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/news/{id}': {
      get: {
        summary: 'Retrieve a specific news item',
        tags: ['News'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The news item ID',
          },
        ],
        responses: {
          '200': {
            description: 'A news item',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/News',
                },
              },
            },
          },
          '404': {
            description: 'News item not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
      patch: {
        summary: 'Update a specific news item',
        tags: ['News'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The news item ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/News',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'News item updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/News',
                },
              },
            },
          },
          '400': {
            description: 'Invalid input',
          },
          '404': {
            description: 'News item not found',
          },
        },
      },
      delete: {
        summary: 'Delete a specific news item',
        tags: ['News'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The news item ID',
          },
        ],
        responses: {
          '200': {
            description: 'News item deleted successfully',
          },
          '404': {
            description: 'News item not found',
          },
          '500': {
            description: 'Server error',
          },
        },
      },
    },
    '/news/{id}/archived': {
      patch: {
        summary: 'Archive or unarchive a news item',
        tags: ['News'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The news item ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  archived: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'News item archived/unarchived successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/News',
                },
              },
            },
          },
          '400': {
            description: 'Invalid input',
          },
          '404': {
            description: 'News item not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      News: {
        type: 'object',
        required: ['title'],
        properties: {
          title: {
            type: 'string',
            description: 'The news title',
          },
          html: {
            type: 'string',
            description: 'The news content in HTML format',
          },
          shortTitle: {
            type: 'string',
          },
          shortDescription: {
            type: 'string',
          },
          datetimeFrom: {
            type: 'string',
            format: 'date-time',
          },
          datetimeTo: {
            type: 'string',
            format: 'date-time',
          },
          isDraft: {
            type: 'boolean',
          },
          archived: {
            type: 'boolean',
            default: false,
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
          isActive: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },
  },
};