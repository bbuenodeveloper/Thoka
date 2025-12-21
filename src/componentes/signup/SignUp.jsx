import React, { useState } from 'react';
import Modal from './Modal';

export default function SignUp({ isOpen, onClose, onSwitchToLogin }) { // Now accepts isOpen, onClose, onSwitchToLogin as props
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Erro no cadastro");
      } else {
        setMessage(`Usuário ${data.name} cadastrado com sucesso!`);
        setFormData({ name: '', email: '', password: '' });
        // Optionally close modal after a short delay on success
        setTimeout(() => onClose(), 2000); // Use onClose prop
      }
    } catch (err) {
      setMessage("Erro ao cadastrar");
    }
  };

  const handleLoginButtonClick = () => {
    onClose(); // Use onClose prop to close signup modal
    onSwitchToLogin();  // Call parent function to open login modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}> {/* Use isOpen and onClose props */}
      <h2 className="text-2xl font-bold mb-4">Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full text-black"
        />
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Cadastrar
        </button>
      </form>

      {message && <p className="mt-2 text-black">{message}</p>}

      {/* New Login button */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700">Já tem uma conta?</p>
        <button
          type="button"
          onClick={handleLoginButtonClick}
          className="text-blue-600 hover:underline mt-1"
        >
          Fazer Login
        </button>
      </div>
    </Modal>
  );
}
