import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

// Mock de las dependencias
jest.mock('../organisms/Header', () => () => <div data-testid="header">Header Mock</div>);
jest.mock('../organisms/Footer', () => () => <div data-testid="footer">Footer Mock</div>);
jest.mock('../molecules/ProductCard', () => ({ producto }) => (
  <div data-testid="product-card">{producto?.nombre || 'Product'}</div>
));

// Mock del servicio de productos
const mockObtenerProductos = jest.fn();
jest.mock('../../../services/productService', () => ({
  obtenerProductos: () => mockObtenerProductos()
}));

describe('Componente Home', () => {
  beforeEach(() => {
    mockObtenerProductos.mockClear();
  });

  describe('Comportamiento inicial', () => {
    it('debería mostrar estado de carga inicialmente', () => {
      // Mock que nunca se resuelve para mantener el estado de carga
      mockObtenerProductos.mockReturnValue(new Promise(() => {}));
      
      render(<Home />);
      
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('debería renderizar Header y Footer siempre', () => {
      mockObtenerProductos.mockReturnValue(new Promise(() => {}));
      
      render(<Home />);
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Cuando los productos se cargan exitosamente', () => {
    it('debería mostrar hasta 8 productos destacados', async () => {
      const mockProductos = [
        { id: 1, nombre: 'Teclado Mecánico' },
        { id: 2, nombre: 'Mouse Gamer' },
        { id: 3, nombre: 'Audífonos' },
        { id: 4, nombre: 'Monitor' },
        { id: 5, nombre: 'Silla Gamer' },
        { id: 6, nombre: 'Mousepad' },
        { id: 7, nombre: 'Micrófono' },
        { id: 8, nombre: 'Webcam' },
        { id: 9, nombre: 'Tableta Gráfica' } // Este no debería mostrarse
      ];

      mockObtenerProductos.mockResolvedValue(mockProductos);

      render(<Home />);

      // Esperar a que desaparezca el loading
      await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      });

      // Verificar que se muestran máximo 8 productos
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(8);
    });

    it('debería mostrar el contenido estático correcto', async () => {
      mockObtenerProductos.mockResolvedValue([]);

      render(<Home />);

      await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Level Up Gamer')).toBeInTheDocument();
      expect(screen.getByText(/Somos Una tienda que vende perifericos/)).toBeInTheDocument();
      expect(screen.getByText('Productos destacados')).toBeInTheDocument();
      expect(screen.getByText('Ver catálogo')).toBeInTheDocument();
    });
  });

  describe('Manejo de estados de error', () => {
    it('debería manejar errores al cargar productos', async () => {
      mockObtenerProductos.mockRejectedValue(new Error('Error de conexión'));

      render(<Home />);

      await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      });

      // No debería haber productos cuando hay error
      const productCards = screen.queryAllByTestId('product-card');
      expect(productCards).toHaveLength(0);
    });

    it('debería manejar cuando el servicio retorna null', async () => {
      mockObtenerProductos.mockResolvedValue(null);

      render(<Home />);

      await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      });

      const productCards = screen.queryAllByTestId('product-card');
      expect(productCards).toHaveLength(0);
    });
  });

  describe('Renderizado de elementos de UI', () => {
    it('debería mostrar la imagen del logo', async () => {
      mockObtenerProductos.mockResolvedValue([]);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      });

      const logoImage = screen.getByAltText('Level UP Store Logo');
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('src', '/assets/img/icon.png');
    });

    it('debería tener link al catálogo con href correcto', async () => {
      mockObtenerProductos.mockResolvedValue([]);
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      });

      const catalogoLink = screen.getByText('Ver catálogo');
      expect(catalogoLink.closest('a')).toHaveAttribute('href', '/catalogo');
    });
  });
});