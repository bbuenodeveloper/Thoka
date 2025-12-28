import React, { useState } from 'react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { useCart } from '../../context/CartContext';
import { RiCloseLine } from 'react-icons/ri';

const STEPS = {
    ADDRESS: 'address',
    PAYMENT: 'payment',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    ERROR: 'error',
};

function CheckoutModal({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(STEPS.ADDRESS);
    const [checkoutData, setCheckoutData] = useState({
        address: null,
        payment: null,
    });
    const { clearCart, cartItems } = useCart();

    const processPayment = async (finalCheckoutData) => {
        setCurrentStep(STEPS.PROCESSING);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalCheckoutData),
            });

            if (response.ok) {
                setCurrentStep(STEPS.SUCCESS);
                clearCart();
            } else {
                console.error('Payment request failed with status:', response.status, response.statusText);
                const errorData = await response.json();
                console.error('Error details:', errorData);
                setCurrentStep(STEPS.ERROR);
            }
        } catch (error) {
            console.error('An error occurred during payment processing:', error);
            setCurrentStep(STEPS.ERROR);
        }
    };

    const handleAddressSubmit = (addressData) => {
        setCheckoutData(prev => ({ ...prev, address: addressData }));
        setCurrentStep(STEPS.PAYMENT);
    };

    const handlePaymentSubmit = (paymentData) => {
        const finalCheckoutData = {
            ...checkoutData,
            payment: paymentData,
            items: cartItems,
        };
        setCheckoutData(finalCheckoutData);
        processPayment(finalCheckoutData);
    };

    const handleBack = () => {
        if (currentStep === STEPS.PAYMENT) {
            setCurrentStep(STEPS.ADDRESS);
        }
    };
    
    const handleClose = () => {
        setCurrentStep(STEPS.ADDRESS);
        setCheckoutData({ address: null, payment: null });
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {currentStep === STEPS.ADDRESS && 'Endereço de Entrega'}
                        {currentStep === STEPS.PAYMENT && 'Pagamento'}
                        {currentStep === STEPS.PROCESSING && 'Processando...'}
                        {currentStep === STEPS.SUCCESS && 'Sucesso!'}
                        {currentStep === STEPS.ERROR && 'Erro no Pagamento'}
                    </h2>
                    <button onClick={handleClose} className="text-gray-600 hover:text-gray-900" disabled={currentStep === STEPS.PROCESSING}>
                        <RiCloseLine size={24} />
                    </button>
                </div>

                {currentStep === STEPS.ADDRESS && (
                    <AddressForm onSubmit={handleAddressSubmit} />
                )}

                {currentStep === STEPS.PAYMENT && (
                    <PaymentForm onSubmit={handlePaymentSubmit} onBack={handleBack} />
                )}

                {currentStep === STEPS.PROCESSING && (
                    <div className="text-center">
                        <p>Processando seu pagamento, por favor aguarde...</p>
                        {/* You could add a spinner here */}
                    </div>
                )}

                {currentStep === STEPS.SUCCESS && (
                    <div className="text-center">
                        <p className="text-green-600 font-semibold text-lg">Compra realizada com sucesso!</p>
                        <p className="mt-2">Obrigado por comprar conosco.</p>
                        <button onClick={handleClose} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Fechar
                        </button>
                    </div>
                )}
                
                {currentStep === STEPS.ERROR && (
                    <div className="text-center">
                        <p className="text-red-600 font-semibold text-lg">A compra foi negada.</p>
                        <p className="mt-2">Por favor, tente novamente.</p>
                         <button onClick={() => setCurrentStep(STEPS.PAYMENT)} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Tentar Novamente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckoutModal;
