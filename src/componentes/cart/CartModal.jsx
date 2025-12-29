import React, { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { RiCloseLine, RiAddLine, RiSubtractLine } from "react-icons/ri";

function CartModal({ isOpen, onClose, onGoToCheckout }) {
    const { cartItems, addToCart, removeFromCart, getCartTotal, clearCart } = useCart();
    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
            <div ref={modalRef} className="bg-gray-50 w-full sm:w-96 h-full flex flex-col shadow-2xl pointer-events-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-gray-800">Seu Carrinho</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
                        <RiCloseLine size={28} />
                    </button>
                </div>

                {isCartEmpty ? (
                    <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                        <p className="text-gray-500">Seu carrinho está vazio.</p>
                        <button 
                            onClick={onClose}
                            className="cursor-pointer mt-4 px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all"
                        >
                            Continuar Comprando
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-grow p-4 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center mb-5">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => removeFromCart(item.id)} className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors cursor-pointer"><RiSubtractLine /></button>
                                            <span className="px-3 font-medium">{item.quantity}</span>
                                            <button onClick={() => addToCart(item)} className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors cursor-pointer"><RiAddLine /></button>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-800">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex justify-between items-center font-semibold text-lg mb-4">
                                <span>Subtotal</span>
                                <span>R$ {getCartTotal().toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={onGoToCheckout}
                                disabled={isCartEmpty}
                                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Finalizar Compra
                            </button>
                            <button 
                                onClick={() => clearCart()}
                                className="cursor-pointer w-full mt-2 mb-5 text-sm text-gray-500 hover:text-red-500 transition-colors"
                            >
                                Limpar Carrinho
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartModal;