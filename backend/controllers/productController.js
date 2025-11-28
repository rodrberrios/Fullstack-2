// Controlador para gestión de productos

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const productsRef = db.collection('producto');
        const snapshot = await productsRef.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const products = [];
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos', details: error.message });
    }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productRef = db.collection('producto').doc(id);
        const doc = await productRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error al obtener producto', details: error.message });
    }
};

// Crear nuevo producto
const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Validación básica
        if (!productData.nombre || !productData.precio) {
            return res.status(400).json({ error: 'Nombre y precio son requeridos' });
        }

        const productsRef = db.collection('producto');
        const docRef = await productsRef.add({
            ...productData,
            activo: productData.activo !== undefined ? productData.activo : true,
            stock: productData.stock || 0
        });

        const newProduct = await docRef.get();

        res.status(201).json({
            id: docRef.id,
            ...newProduct.data()
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto', details: error.message });
    }
};

// Actualizar producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const productRef = db.collection('producto').doc(id);
        const doc = await productRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await productRef.update(updateData);
        const updatedProduct = await productRef.get();

        res.status(200).json({
            id: updatedProduct.id,
            ...updatedProduct.data()
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto', details: error.message });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productRef = db.collection('producto').doc(id);
        const doc = await productRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await productRef.delete();

        res.status(200).json({ message: 'Producto eliminado exitosamente', id });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto', details: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
