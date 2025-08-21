// config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './envs';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PokeManager API',
      version: '1.0.0',
      description: 'API para gestión de Pokémon y Entrenadores - Proyecto FILUP',
      contact: {
        name: 'Desarrollador',
        email: 'tu.email@ejemplo.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api-docs`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Entrenador: {
          type: 'object',
          required: ['nombre', 'apellido', 'telefono', 'medallas'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del entrenador',
              example: '507f1f77bcf86cd799439011'
            },
            nombre: {
              type: 'string',
              minLength: 2,
              maxLength: 60,
              description: 'Nombre del entrenador',
              example: 'Ash'
            },
            apellido: {
              type: 'string',
              minLength: 2,
              maxLength: 80,
              description: 'Apellido del entrenador',
              example: 'Ketchum'
            },
            telefono: {
              type: 'string',
              pattern: '^[0-9+\\-\\s()]{7,20}$',
              description: 'Número de teléfono del entrenador',
              example: '1234567890'
            },
            medallas: {
              type: 'integer',
              minimum: 0,
              maximum: 20,
              description: 'Cantidad de medallas del entrenador (0-20)',
              example: 8
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización'
            }
          }
        },
        PokemonListItem: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del Pokémon',
              example: 'pikachu'
            },
            url: {
              type: 'string',
              format: 'uri',
              description: 'URL para obtener detalles completos del Pokémon',
              example: 'https://pokeapi.co/api/v2/pokemon/25/'
            }
          }
        },
        PokemonDetail: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del Pokémon',
              example: 'pikachu'
            },
            abilities: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Lista de habilidades del Pokémon',
              example: ['static', 'lightning-rod']
            },
            image: {
              type: 'string',
              format: 'uri',
              description: 'URL de la imagen oficial del Pokémon',
              example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
            },
            stats: {
              type: 'object',
              description: 'Estadísticas del Pokémon',
              properties: {
                hp: { type: 'integer', example: 35 },
                attack: { type: 'integer', example: 55 },
                defense: { type: 'integer', example: 40 },
                specialAttack: { type: 'integer', example: 50 },
                specialDefense: { type: 'integer', example: 50 },
                speed: { type: 'integer', example: 90 }
              }
            },
            types: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tipos del Pokémon',
              example: ['electric']
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Recurso no encontrado'
            },
            issues: {
              type: 'array',
              description: 'Detalles de errores de validación (opcional)',
              items: {
                type: 'object'
              }
            }
          }
        }
      },
      parameters: {
        MongoId: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'mongoId'
          },
          description: 'ID de MongoDB'
        },
        PokemonSearch: {
          in: 'query',
          name: 'search',
          required: false,
          schema: {
            type: 'string'
          },
          description: 'Término para buscar Pokémon por nombre'
        },
        PageNumber: {
          in: 'query',
          name: 'page',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1
          },
          description: 'Número de página para paginación'
        },
        PageLimit: {
          in: 'query',
          name: 'limit',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10
          },
          description: 'Límite de resultados por página'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };    