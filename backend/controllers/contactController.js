// Controlador para gestión de contactos/consultas
// db es global según server.js

// Crear nueva consulta
const createContact = async (req, res) => {
    try {
        const contactData = req.body;

        // Validación básica
        if (!contactData.nombre || !contactData.email || !contactData.mensaje) {
            return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos' });
        }

        const contactsRef = db.collection('consultas');
        const docRef = await contactsRef.add({
            ...contactData,
            fecha: new Date().toISOString(),
            estado: 'pendiente' // pendiente, respondido
        });

        const newContact = await docRef.get();

        res.status(201).json({
            id: docRef.id,
            ...newContact.data()
        });
    } catch (error) {
        console.error('Error al crear consulta:', error);
        res.status(500).json({ error: 'Error al crear consulta', details: error.message });
    }
};

// Obtener consultas por usuario (email)
const getContactsByUser = async (req, res) => {
    try {
        const { email } = req.params;
        const contactsRef = db.collection('consultas');
        const snapshot = await contactsRef.where('email', '==', email).get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const contacts = [];
        snapshot.forEach(doc => {
            contacts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error al obtener consultas del usuario:', error);
        res.status(500).json({ error: 'Error al obtener consultas', details: error.message });
    }
};

module.exports = {
    createContact,
    getContactsByUser
};
