import React from 'react';
import { useCart } from '../../context/CartContext';
import Ps5 from '../../../img/ps5.webp';
import Xbox from '../../../img/xbox.jpg';


const products = [
  {
    id: 1,
    name: 'Ps5 Pro',
    price: 2999.99,
    imageUrl: Ps5,
    description: 'PlayStation 5 Pro com desempenho aprimorado e gráficos incríveis.',
  },
  {
    id: 2,
    name: 'Xbox Series X',
    price: 2499.99,
    imageUrl: Xbox,
    description: 'Xbox Series X com poder de processamento avançado e jogos em 4K.',
  },
  {
    id: 3,
    name: 'Ps5 Pro',
    price: 1999.99,
    imageUrl: Ps5,
    description: 'PlayStation 5 Pro com desempenho aprimorado e gráficos incríveis.',
  },
  {
    id: 4,
    name: 'Xbox Series X',
    price: 1499.99,
    imageUrl: Xbox,
    description: 'Xbox Series X com poder de processamento avançado e jogos em 4K.',
  },
  {
    id: 5,
    name: 'Ps5 Pro',
    price: 2500.00,
    imageUrl: Ps5,
    description: 'PlayStation 5 Pro com desempenho aprimorado e gráficos incríveis.',
  },
  {
    id: 6,
    name: 'Xbox Series X',
    price: 2200.00,
    imageUrl: Xbox,
    description: 'Xbox Series X com poder de processamento avançado e jogos em 4K.',
  },
  {
    id: 7,
    name: 'Ps5 Pro',
    price: 2500.00,
    imageUrl: Ps5,
    description: 'PlayStation 5 Pro com desempenho aprimorado e gráficos incríveis.',
  },
  {
    id: 8,
    name: 'Xbox Series X',
    price: 2200.00,
    imageUrl: Xbox,
    description: 'Xbox Series X com poder de processamento avançado e jogos em 4K.',
  },
];

function Marketplace() {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Nosso Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={product.imageUrl} alt={product.name} className="w-full h-50 object-center object-scale-down" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm cursor-pointer"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
