// Controlador para gestión de usuarios

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const usersRef = db.collection('usuarios');
        const snapshot = await usersRef.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const users = [];
        snapshot.forEach(doc => {
            const userData = doc.data();
            // No enviar la contraseña en la respuesta
            delete userData.contrasena;
            users.push({
                id: doc.id,
                ...userData
            });
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userRef = db.collection('usuarios').doc(id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const userData = doc.data();
        delete userData.contrasena; // No enviar la contraseña

        res.status(200).json({
            id: doc.id,
            ...userData
        });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario', details: error.message });
    }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Validación básica
        if (!userData.nombre || !userData.correo) {
            return res.status(400).json({ error: 'Nombre y correo son requeridos' });
        }

        const usersRef = db.collection('usuarios');
        const docRef = await usersRef.add({
            ...userData,
            rol: userData.rol || 'cliente'
        });

        const newUser = await docRef.get();
        const newUserData = newUser.data();
        delete newUserData.contrasena;

        res.status(201).json({
            id: docRef.id,
            ...newUserData
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const userRef = db.collection('usuarios').doc(id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await userRef.update(updateData);
        const updatedUser = await userRef.get();
        const updatedUserData = updatedUser.data();
        delete updatedUserData.contrasena;

        res.status(200).json({
            id: updatedUser.id,
            ...updatedUserData
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userRef = db.collection('usuarios').doc(id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await userRef.delete();

        res.status(200).json({ message: 'Usuario eliminado exitosamente', id });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario', details: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
