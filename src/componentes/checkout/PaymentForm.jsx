import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    cardName: Yup.string().required('Nome no cartão obrigatório'),
    cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, 'Número do cartão inválido (16 dígitos)')
        .required('Número do cartão obrigatório'),
    expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Data de validade inválida (MM/AA)')
        .required('Data de validade obrigatória'),
    cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, 'CVV inválido (3 ou 4 dígitos)')
        .required('CVV obrigatório'),
});

function PaymentForm({ onSubmit, onBack }) {
    const formik = useFormik({
        initialValues: {
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
                    Nome no Cartão
                </label>
                <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardName}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.cardName && formik.errors.cardName ? (
                    <div className="text-red-500 text-sm">{formik.errors.cardName}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                    Número do Cartão
                </label>
                <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardNumber}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                    <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                ) : null}
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                        Data de Validade
                    </label>
                    <input
                        type="text"
                        name="expiryDate"
                        id="expiryDate"
                        placeholder="MM/AA"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.expiryDate}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.expiryDate && formik.errors.expiryDate ? (
                        <div className="text-red-500 text-sm">{formik.errors.expiryDate}</div>
                    ) : null}
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                        CVV
                    </label>
                    <input
                        type="text"
                        name="cvv"
                        id="cvv"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cvv}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.cvv && formik.errors.cvv ? (
                        <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
                    ) : null}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Voltar
                </button>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={formik.isSubmitting}
                >
                    Pagar
                </button>
            </div>
        </form>
    );
}

export default PaymentForm;
