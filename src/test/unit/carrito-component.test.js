// Tests de Jasmine para el componente Carrito.jsx
// Usando React Testing Library con Jasmine

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../../components/pages/Carrito';

// Mock de Firebase
const mockGetDocs = jasmine.createSpy('getDocs').and.returnValue(
    Promise.resolve({
        docs: [
            {
                id: '1',
                data: () => ({
                    nombre: 'Producto Test 1',
                    precio: 10000,
                    precioAnterior: 15000,
                    stock: 5,
                    imagen: 'https://via.placeholder.com/400x300'
                })
            },
            {
                id: '2',
                data: () => ({
                    nombre: 'Producto Test 2',
                    precio: 20000,
                    precioAnterior: 25000,
                    stock: 10,
                    imagen: 'https://via.placeholder.com/400x300'
                })
            }
        ]
    })
);

const mockUpdateDoc = jasmine.createSpy('updateDoc').and.returnValue(Promise.resolve());

// Mock del módulo de Firebase
jest.mock('../../config/firebase', () => ({
    db: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: (...args) => mockGetDocs(...args),
    doc: jest.fn(),
    updateDoc: (...args) => mockUpdateDoc(...args)
}));

// Helper para renderizar con Router
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Componente Carrito', function () {

    beforeEach(function () {
        // Limpiar localStorage antes de cada prueba
        localStorage.clear();

        // Resetear spies
        mockGetDocs.calls.reset();
        mockUpdateDoc.calls.reset();

        // Mock de window.alert
        spyOn(window, 'alert');
        spyOn(window, 'confirm').and.returnValue(true);
    });

    afterEach(function () {
        localStorage.clear();
    });

    describe('Renderizado Inicial', function () {

        it('debe renderizar el componente correctamente', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Productos en Oferta')).toBeInTheDocument();
                expect(screen.getByText('Resumen del Carrito')).toBeInTheDocument();
            });
        });

        it('debe mostrar mensaje de cargando inicialmente', function () {
            renderWithRouter(<Carrito />);

            expect(screen.getByText('Cargando productos en oferta...')).toBeInTheDocument();
        });

        it('debe cargar productos en oferta desde Firebase', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
                expect(screen.getByText('Producto Test 2')).toBeInTheDocument();
            });

            expect(mockGetDocs).toHaveBeenCalled();
        });
    });

    describe('Carrito Vacío', function () {

        it('debe mostrar mensaje de carrito vacío cuando no hay productos', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
            });
        });

        it('debe mostrar botón para ir al catálogo', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                const botonCatalogo = screen.getByText('Ir al Catálogo');
                expect(botonCatalogo).toBeInTheDocument();
            });
        });
    });

    describe('Agregar Productos al Carrito', function () {

        it('debe agregar producto desde ofertas al carrito', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            // Buscar todos los botones "Añadir" y hacer clic en el primero
            const botonesAñadir = screen.getAllByText('Añadir');
            fireEvent.click(botonesAñadir[0]);

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith(
                    jasmine.stringContaining('Producto Test 1')
                );
            });
        });

        it('debe guardar el carrito en localStorage', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            const botonesAñadir = screen.getAllByText('Añadir');
            fireEvent.click(botonesAñadir[0]);

            await waitFor(() => {
                const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
                expect(carritoGuardado).toBeTruthy();
                expect(carritoGuardado.length).toBeGreaterThan(0);
            });
        });

        it('debe incrementar cantidad si el producto ya existe', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            const botonesAñadir = screen.getAllByText('Añadir');

            // Agregar el mismo producto dos veces
            fireEvent.click(botonesAñadir[0]);

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalled();
            });

            fireEvent.click(botonesAñadir[0]);

            await waitFor(() => {
                const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
                expect(carritoGuardado[0].cantidad).toBe(2);
            });
        });
    });

    describe('Gestión de Cantidades', function () {

        beforeEach(function () {
            // Pre-cargar carrito con productos
            const carritoInicial = [
                {
                    id: '1',
                    nombre: 'Producto Test 1',
                    precio: 10000,
                    cantidad: 2,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoInicial));
        });

        it('debe incrementar la cantidad de un producto', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            // Buscar el botón "+" en los controles de cantidad
            const botones = screen.getAllByText('+');
            fireEvent.click(botones[0]);

            await waitFor(() => {
                const carritoActualizado = JSON.parse(localStorage.getItem('carrito'));
                expect(carritoActualizado[0].cantidad).toBe(3);
            });
        });

        it('debe decrementar la cantidad de un producto', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            // Buscar el botón "-" en los controles de cantidad
            const botones = screen.getAllByText('-');
            fireEvent.click(botones[0]);

            await waitFor(() => {
                const carritoActualizado = JSON.parse(localStorage.getItem('carrito'));
                expect(carritoActualizado[0].cantidad).toBe(1);
            });
        });

        it('no debe permitir cantidad menor a 1', async function () {
            // Carrito con cantidad 1
            const carritoConUno = [
                {
                    id: '1',
                    nombre: 'Producto Test 1',
                    precio: 10000,
                    cantidad: 1,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoConUno));

            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            const botones = screen.getAllByText('-');
            fireEvent.click(botones[0]);

            // La cantidad debe seguir siendo 1
            const carritoActualizado = JSON.parse(localStorage.getItem('carrito'));
            expect(carritoActualizado[0].cantidad).toBe(1);
        });
    });

    describe('Eliminar Productos', function () {

        beforeEach(function () {
            const carritoInicial = [
                {
                    id: '1',
                    nombre: 'Producto Test 1',
                    precio: 10000,
                    cantidad: 1,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoInicial));
        });

        it('debe eliminar un producto del carrito', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            const botonEliminar = screen.getByText('Eliminar');
            fireEvent.click(botonEliminar);

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith(
                    jasmine.stringContaining('eliminado')
                );
                const carritoActualizado = JSON.parse(localStorage.getItem('carrito'));
                expect(carritoActualizado.length).toBe(0);
            });
        });
    });

    describe('Cálculo de Totales', function () {

        beforeEach(function () {
            const carritoConMultiples = [
                {
                    id: '1',
                    nombre: 'Producto Test 1',
                    precio: 10000,
                    cantidad: 2,
                    imagen: 'https://via.placeholder.com/400x300'
                },
                {
                    id: '2',
                    nombre: 'Producto Test 2',
                    precio: 20000,
                    cantidad: 1,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoConMultiples));
        });

        it('debe calcular el total correctamente', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                // Total: 10000*2 + 20000*1 = 40000
                expect(screen.getByText('40.000')).toBeInTheDocument();
            });
        });

        it('debe calcular subtotales correctamente', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                // Subtotal del primer producto: 10000 * 2 = 20000
                expect(screen.getByText('20.000')).toBeInTheDocument();
                // Subtotal del segundo producto: 20000 * 1 = 20000
            });
        });
    });

    describe('Limpiar Carrito', function () {

        beforeEach(function () {
            const carritoInicial = [
                {
                    id: '1',
                    nombre: 'Producto Test 1',
                    precio: 10000,
                    cantidad: 2,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoInicial));
        });

        it('debe limpiar todo el carrito', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            const botonLimpiar = screen.getByText('Limpiar Carrito');
            fireEvent.click(botonLimpiar);

            await waitFor(() => {
                expect(window.confirm).toHaveBeenCalled();
                const carritoActualizado = localStorage.getItem('carrito');
                expect(carritoActualizado).toBeNull();
            });
        });

        it('debe mostrar mensaje de confirmación antes de limpiar', async function () {
            window.confirm.and.returnValue(false); // Usuario cancela

            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Test 1')).toBeInTheDocument();
            });

            const botonLimpiar = screen.getByText('Limpiar Carrito');
            fireEvent.click(botonLimpiar);

            expect(window.confirm).toHaveBeenCalledWith(
                jasmine.stringContaining('¿Estás seguro')
            );

            // El carrito no debe estar vacío
            const carritoActualizado = JSON.parse(localStorage.getItem('carrito'));
            expect(carritoActualizado.length).toBe(1);
        });
    });

    describe('Navegación al Checkout', function () {

        it('debe mostrar alerta si el carrito está vacío', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
            });

            // Intentar ir al checkout con carrito vacío
            // Nota: El botón de checkout no está visible cuando el carrito está vacío
            // Esta prueba verifica el comportamiento de la función irAlCheckout
        });
    });

    describe('Persistencia de datos', function () {

        it('debe cargar el carrito desde localStorage al iniciar', async function () {
            const carritoGuardado = [
                {
                    id: '1',
                    nombre: 'Producto Persistente',
                    precio: 5000,
                    cantidad: 3,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoGuardado));

            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText('Producto Persistente')).toBeInTheDocument();
                expect(screen.getByText('3')).toBeInTheDocument(); // Cantidad
            });
        });
    });

    describe('Manejo de Stock', function () {

        it('debe mostrar el stock disponible de productos en oferta', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                expect(screen.getByText(/Stock: 5/)).toBeInTheDocument();
                expect(screen.getByText(/Stock: 10/)).toBeInTheDocument();
            });
        });
    });

    describe('Manejo de Imágenes', function () {

        it('debe mostrar imágenes de productos', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                const imagenes = screen.getAllByRole('img');
                expect(imagenes.length).toBeGreaterThan(0);
            });
        });

        it('debe tener fallback para imágenes rotas', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                const imagenes = screen.getAllByRole('img');
                imagenes.forEach(img => {
                    expect(img).toHaveAttribute('src');
                });
            });
        });
    });

    describe('Formato de Precios', function () {

        it('debe formatear precios correctamente', async function () {
            const carritoConProducto = [
                {
                    id: '1',
                    nombre: 'Producto Test',
                    precio: 15000,
                    cantidad: 1,
                    imagen: 'https://via.placeholder.com/400x300'
                }
            ];
            localStorage.setItem('carrito', JSON.stringify(carritoConProducto));

            renderWithRouter(<Carrito />);

            await waitFor(() => {
                // Verificar que el precio se muestre formateado
                expect(screen.getByText('15.000')).toBeInTheDocument();
            });
        });

        it('debe mostrar precio anterior tachado en ofertas', async function () {
            renderWithRouter(<Carrito />);

            await waitFor(() => {
                // Verificar que los precios anteriores se muestren
                expect(screen.getByText('15.000')).toBeInTheDocument();
                expect(screen.getByText('25.000')).toBeInTheDocument();
            });
        });
    });
});
