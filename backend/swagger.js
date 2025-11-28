const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Level Up Store API',
            version: '1.0.0',
            description: 'API REST para la gestión de la tienda Level Up Store. Incluye endpoints para productos, usuarios, órdenes y categorías.',
            contact: {
                name: 'Level Up Store',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de desarrollo',
            },
        ],
        tags: [
            {
                name: 'Products',
                description: 'Endpoints para gestión de productos',
            },
            {
                name: 'Users',
                description: 'Endpoints para gestión de usuarios',
            },
            {
                name: 'Orders',
                description: 'Endpoints para gestión de órdenes/compras',
            },
            {
                name: 'Categories',
                description: 'Endpoints para gestión de categorías',
            },
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del producto',
                        },
                        nombre: {
                            type: 'string',
                            description: 'Nombre del producto',
                        },
                        precio: {
                            type: 'number',
                            description: 'Precio del producto',
                        },
                        stock: {
                            type: 'number',
                            description: 'Cantidad en stock',
                        },
                        categoria: {
                            type: 'string',
                            description: 'Categoría del producto',
                        },
                        descripcion: {
                            type: 'string',
                            description: 'Descripción del producto',
                        },
                        imagen: {
                            type: 'string',
                            description: 'URL de la imagen del producto',
                        },
                        activo: {
                            type: 'boolean',
                            description: 'Estado del producto (activo/inactivo)',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del usuario',
                        },
                        nombre: {
                            type: 'string',
                            description: 'Nombre del usuario',
                        },
                        correo: {
                            type: 'string',
                            description: 'Correo electrónico',
                        },
                        telefono: {
                            type: 'string',
                            description: 'Teléfono del usuario',
                        },
                        rol: {
                            type: 'string',
                            description: 'Rol del usuario (admin/cliente)',
                        },
                    },
                },
                Order: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único de la orden',
                        },
                        usuario: {
                            type: 'string',
                            description: 'Email del usuario que realizó la compra',
                        },
                        productos: {
                            type: 'array',
                            items: {
                                type: 'object',
                            },
                            description: 'Lista de productos comprados',
                        },
                        total: {
                            type: 'number',
                            description: 'Total de la compra',
                        },
                        fecha: {
                            type: 'string',
                            description: 'Fecha de la compra',
                        },
                        estado: {
                            type: 'string',
                            description: 'Estado de la orden',
                        },
                    },
                },
                Category: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único de la categoría',
                        },
                        nombre: {
                            type: 'string',
                            description: 'Nombre de la categoría',
                        },
                        descripcion: {
                            type: 'string',
                            description: 'Descripción de la categoría',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
