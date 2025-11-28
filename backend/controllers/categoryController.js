// Controlador para gestión de categorías

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const categoriesRef = db.collection('categorias');
        const snapshot = await categoriesRef.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const categories = [];
        snapshot.forEach(doc => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener categorías', details: error.message });
    }
};

// Obtener categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryRef = db.collection('categorias').doc(id);
        const doc = await categoryRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({ error: 'Error al obtener categoría', details: error.message });
    }
};

// Crear nueva categoría
const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;

        // Validación básica
        if (!categoryData.nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }

        const categoriesRef = db.collection('categorias');
        const docRef = await categoriesRef.add(categoryData);

        const newCategory = await docRef.get();

        res.status(201).json({
            id: docRef.id,
            ...newCategory.data()
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ error: 'Error al crear categoría', details: error.message });
    }
};

// Actualizar categoría
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const categoryRef = db.collection('categorias').doc(id);
        const doc = await categoryRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await categoryRef.update(updateData);
        const updatedCategory = await categoryRef.get();

        res.status(200).json({
            id: updatedCategory.id,
            ...updatedCategory.data()
        });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ error: 'Error al actualizar categoría', details: error.message });
    }
};

// Eliminar categoría
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryRef = db.collection('categorias').doc(id);
        const doc = await categoryRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await categoryRef.delete();

        res.status(200).json({ message: 'Categoría eliminada exitosamente', id });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error al eliminar categoría', details: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
