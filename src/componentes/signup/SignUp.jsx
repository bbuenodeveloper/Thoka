import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from './Modal';

const validationSchema = Yup.object({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email inválido').matches(/@.+\.(com|com\.br)$/i, 'Email deve terminar com .com ou .com.br').required('Email obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

export default function SignUp({ isOpen, onClose, onSwitchToLogin }) {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setMessage('');
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await res.text();
            console.error("Signup response was not JSON:", text);
            setMessage("Ocorreu um erro inesperado no servidor.");
            return;
        }

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Erro no cadastro");
        } else {
          setMessage(`Usuário ${data.name} cadastrado com sucesso!`);
          resetForm();
          setTimeout(() => onClose(), 2000);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setMessage("Erro ao cadastrar. Verifique sua conexão ou tente novamente.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLoginButtonClick = () => {
    onClose();
    onSwitchToLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Cadastro de Usuário</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="border p-2 w-full text-black"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={formik.isSubmitting}>
          Cadastrar
        </button>
      </form>

      {message && <p className="mt-2 text-black">{message}</p>}

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
