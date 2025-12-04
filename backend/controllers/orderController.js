// Controlador para gestión de órdenes/compras

// Obtener todas las órdenes
const getAllOrders = async (req, res) => {
    try {
        const ordersRef = db.collection('compras');
        const snapshot = await ordersRef.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const orders = [];
        snapshot.forEach(doc => {
            orders.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ error: 'Error al obtener órdenes', details: error.message });
    }
};

// Obtener orden por ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderRef = db.collection('compras').doc(id);
        const doc = await orderRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        console.error('Error al obtener orden:', error);
        res.status(500).json({ error: 'Error al obtener orden', details: error.message });
    }
};

// Crear nueva orden
const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        // Validación básica
        if (!orderData.usuario || !orderData.productos || !orderData.total) {
            return res.status(400).json({ error: 'Usuario, productos y total son requeridos' });
        }

        const ordersRef = db.collection('compras');
        const docRef = await ordersRef.add({
            ...orderData,
            fecha: orderData.fecha || new Date().toISOString(),
            estado: orderData.estado || 'pendiente'
        });

        const newOrder = await docRef.get();

        res.status(201).json({
            id: docRef.id,
            ...newOrder.data()
        });
    } catch (error) {
        console.error('Error al crear orden:', error);
        res.status(500).json({ error: 'Error al crear orden', details: error.message });
    }
};

// Actualizar orden
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const orderRef = db.collection('compras').doc(id);
        const doc = await orderRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await orderRef.update(updateData);
        const updatedOrder = await orderRef.get();

        res.status(200).json({
            id: updatedOrder.id,
            ...updatedOrder.data()
        });
    } catch (error) {
        console.error('Error al actualizar orden:', error);
        res.status(500).json({ error: 'Error al actualizar orden', details: error.message });
    }
};

// Eliminar orden
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const orderRef = db.collection('compras').doc(id);
        const doc = await orderRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await orderRef.delete();

        res.status(200).json({ message: 'Orden eliminada exitosamente', id });
    } catch (error) {
        console.error('Error al eliminar orden:', error);
        res.status(500).json({ error: 'Error al eliminar orden', details: error.message });
    }
};

// Obtener órdenes por usuario (email)
const getOrdersByUser = async (req, res) => {
    try {
        const { email } = req.params;
        const ordersRef = db.collection('compras');
        const snapshot = await ordersRef.where('usuario', '==', email).get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const orders = [];
        snapshot.forEach(doc => {
            orders.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener órdenes del usuario:', error);
        res.status(500).json({ error: 'Error al obtener órdenes', details: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUser
};
