import React, { useState, useContext } from 'react';
import logo from "../../../img/logo.png"
import { HashLink as Link } from 'react-router-hash-link'
import Login from '../login/Login'
import SignUp from '../signup/SignUp'
import CartModal from '../cart/CartModal';
import CheckoutModal from '../checkout/CheckoutModal';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import { useCart } from '../../context/CartContext';
import { RiShoppingCartLine } from 'react-icons/ri';


function Nav() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const { isLoggedIn, user, logout } = useContext(AuthContext); // Use AuthContext
    const { cartItems } = useCart();

    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    const handleCloseLoginModal = () => setIsLoginModalOpen(false);

    const handleOpenSignUpModal = () => setIsSignUpModalOpen(true);
    const handleCloseSignUpModal = () => setIsSignUpModalOpen(false);
    
    const handleOpenCartModal = () => setIsCartModalOpen(true);
    const handleCloseCartModal = () => setIsCartModalOpen(false);

    const handleOpenCheckoutModal = () => setIsCheckoutModalOpen(true);
    const handleCloseCheckoutModal = () => setIsCheckoutModalOpen(false);

    const handleGoToCheckout = () => {
        handleCloseCartModal();
        handleOpenCheckoutModal();
    };

    const handleSwitchToLogin = () => {
        handleCloseSignUpModal();
        handleOpenLoginModal();
    };

    return (
        <div id="home">
        <header className='flex items-center h-15 w-full fixed z-4 bg-black px-4'>
            <div className="flex justify-around items-center w-full">
                <Link to='#home'><img src={logo} alt='logo' className='cursor-pointer scale-50'/></Link>
                <nav className="flex items-center justify-center">
                    <div>
                        <Link to='#home' className='mr-3 font-bold'>Home</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to='#marketplace' className='mr-3 font-bold'>Marketplace</Link>
                            </>
                        ) : (
                            <>
                                <Link to='#servico' className='mr-3 font-bold'>Serviços</Link>
                                <Link to='#sobre' className='mr-2 font-bold'>Sobre</Link>
                            </>
                        )}
                        <Link to='#contato' className='font-bold mr-5'>Contato</Link>
                    </div>
                </nav>
                <aside className="flex items-center mr-5">
                    {isLoggedIn ? (
                        <>
                            <span className="text-white mr-2">Olá, {user?.name}!</span>
                            <button onClick={logout} className="text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer">
                                Sair
                            </button>
                            <button onClick={handleOpenCartModal} className="relative text-white font-bold py-2 px-4 rounded cursor-pointer">
                                <RiShoppingCartLine size={24} />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </span>
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleOpenLoginModal} className="text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer">
                                Login
                            </button>
                            <button onClick={handleOpenSignUpModal} className="text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Cadastrar
                            </button>
                        </>
                    )}

                    {/* Modals rendered based on state */}
                    <Login
                        isOpen={isLoginModalOpen}
                        onClose={handleCloseLoginModal}
                    />
                    <SignUp
                        isOpen={isSignUpModalOpen}
                        onClose={handleCloseSignUpModal}
                        onSwitchToLogin={handleSwitchToLogin}
                    />
                    <CartModal 
                        isOpen={isCartModalOpen}
                        onClose={handleCloseCartModal}
                        onGoToCheckout={handleGoToCheckout}
                    />
                    <CheckoutModal
                        isOpen={isCheckoutModalOpen}
                        onClose={handleCloseCheckoutModal}
                    />
                </aside>
            </div>
        </header>
        </div>
    )
}

export default Nav