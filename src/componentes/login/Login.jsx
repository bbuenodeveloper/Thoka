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
      <h3 className="text-2xl font-bold mb-4 text-black text-center">Login de Usuário</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex items-center justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" disabled={formik.isSubmitting}>
            Entrar
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-black">{message}</p>}
    </Modal>
  );
}

export default Login;
