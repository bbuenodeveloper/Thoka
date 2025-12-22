import React, { useState } from 'react';
import Login from '../componentes/login/Login';
import SignUp from '../componentes/signup/SignUp';

function AuthPage() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  // Function to switch from SignUp to Login directly
  const handleSwitchToLogin = () => {
    closeSignUpModal();
    openLoginModal();
  };

  return (
    <div className="auth-page-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="auth-content bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Bem-vindo(a)!</h1>
        <p className="mb-6 text-gray-600">Faça login ou cadastre-se para continuar.</p>

        {/* Buttons to open modals */}
        <div className="space-x-4 mb-8">
          <button
            onClick={openLoginModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            onClick={openSignUpModal}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cadastre-se
          </button>
        </div>

        {/* Modals */}
        <Login isOpen={showLoginModal} onClose={closeLoginModal} />
        <SignUp
          isOpen={showSignUpModal}
          onClose={closeSignUpModal}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </div>
  );
}

export default AuthPage;
