import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../signup/Modal';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

function Login({ isOpen, onClose }) {
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext); // Use useContext to get the login function

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setMessage('');
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || 'Erro ao fazer login');
        } else {
          setMessage(`Login bem-sucedido para ${data.user.name}!`);
          login(data.user, data.token);
          resetForm();
          setTimeout(() => onClose(), 2000);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setMessage('Erro ao fazer login, tente novamente.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Login de Usuário</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="border p-2 w-full text-black"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="border p-2 w-full text-black"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={formik.isSubmitting}>
          Entrar
        </button>
      </form>
      {message && <p className="mt-2 text-black">{message}</p>}
    </Modal>
  );
}

export default Login;
