import os

# Leer el archivo CSS
file_path = r"c:\Users\fdhm3\OneDrive\Desktop\Fullstack-2\src\components\pages\Carrito.module.css"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Agregar estilos para el badge de descuento y texto de ahorro después de .productoCard
new_styles = """.descuentoBadge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    font-weight: 800;
    font-size: 16px;
    padding: 8px 14px;
    border-radius: 8px;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

"""

# Insertar después de .productoCard
old_text1 = """.productoCard {
    background: #111318;
    border: 1px solid #1f2937;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.productoCard:hover {
    border-color: #22c55e;
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(34, 197, 94, 0.15);
}

.productoImagen {"""

new_text1 = """.productoCard {
    background: #111318;
    border: 1px solid #1f2937;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
}

.productoCard:hover {
    border-color: #22c55e;
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(34, 197, 94, 0.15);
}

""" + new_styles + """.productoImagen {"""

content = content.replace(old_text1, new_text1)

# Agregar estilo para ahorroTexto después de stockDisponible
old_text2 = """.stockDisponible {
    color: #94a3b8;
    font-size: 13px;
    margin: 0;
}

.btnAgregarOferta {"""

new_text2 = """.stockDisponible {
    color: #94a3b8;
    font-size: 13px;
    margin: 0;
}

.ahorroTexto {
    color: #22c55e;
    font-size: 14px;
    font-weight: 700;
    margin: 0;
    padding: 8px 12px;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(34, 197, 94, 0.2);
}

.btnAgregarOferta {"""

content = content.replace(old_text2, new_text2)

# Escribir el archivo actualizado
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS actualizado exitosamente")
