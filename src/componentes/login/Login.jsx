import React, { useState, useContext } from 'react';
import Modal from '../signup/Modal';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

function Login({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext); // Use useContext to get the login function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Erro ao fazer login');
      } else {
        setMessage(`Login bem-sucedido para ${data.user.name}!`); // Use data.user.name
        login(data.user, data.token); // Call the global login function
        setFormData({ email: '', password: '' });
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Erro ao fazer login, tente novamente.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Login de Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 w-full text-black"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Entrar
        </button>
      </form>
      {message && <p className="mt-2 text-black">{message}</p>}
    </Modal>
  );
}

export default Login;
