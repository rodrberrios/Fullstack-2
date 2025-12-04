const express = require('express');
const router = express.Router();
const {
    createContact,
    getContactsByUser
} = require('../controllers/contactController');

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Enviar mensaje de contacto
 *     tags: [Contacts]
 *     description: Registra una nueva consulta o mensaje de contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - mensaje
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               mensaje:
 *                 type: string
 *               asunto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', createContact);

/**
 * @swagger
 * /api/contacts/user/{email}:
 *   get:
 *     summary: Obtener consultas por usuario
 *     tags: [Contacts]
 *     description: Retorna el historial de consultas realizadas por un usuario específico (Perfil Cliente)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Lista de consultas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Error del servidor
 */
router.get('/user/:email', getContactsByUser);

module.exports = router;
