import React, { useState, useContext } from 'react';
import logo from "../../../img/logo.png"
import { HashLink as Link } from 'react-router-hash-link'
import Cart from "../cart/Cart"
import Login from '../login/Login'
import SignUp from '../signup/SignUp'
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext


function Nav() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const { isLoggedIn, user, logout } = useContext(AuthContext); // Use AuthContext

    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    const handleCloseLoginModal = () => setIsLoginModalOpen(false);

    const handleOpenSignUpModal = () => setIsSignUpModalOpen(true);
    const handleCloseSignUpModal = () => setIsSignUpModalOpen(false);

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
                        <Link to='#servico' className='mr-3 font-bold'>Serviços</Link>
                        <Link to='#sobre' className='mr-2 font-bold'>Sobre</Link>
                        <Link to='#contato' className='font-bold mr-5'>Contato</Link>
                    </div>
                </nav>
                <aside className="flex items-center mr-5">
                    {isLoggedIn ? (
                        <>
                            <span className="text-white mr-2">Olá, {user?.name}!</span>
                            <button onClick={logout} className="text-white font-bold py-2 px-4 rounded mr-2">
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleOpenLoginModal} className="text-white font-bold py-2 px-4 rounded mr-2">
                                Login
                            </button>
                            <button onClick={handleOpenSignUpModal} className="text-white font-bold py-2 px-4 rounded">
                                Cadastrar
                            </button>
                        </>
                    )}

                    <Cart />

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
                </aside>
            </div>
        </header>
        </div>
    )
}

export default Nav