import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    street: Yup.string().required('Rua obrigatória'),
    number: Yup.string().required('Número obrigatório'),
    city: Yup.string().required('Cidade obrigatória'),
    state: Yup.string().required('Estado obrigatório'),
    zip: Yup.string().required('CEP obrigatório'),
});

function AddressForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            street: '',
            number: '',
            city: '',
            state: '',
            zip: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                    Rua
                </label>
                <input
                    type="text"
                    name="street"
                    id="street"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.street}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.street && formik.errors.street ? (
                    <div className="text-red-500 text-sm">{formik.errors.street}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                    Número
                </label>
                <input
                    type="text"
                    name="number"
                    id="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.number}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.number && formik.errors.number ? (
                    <div className="text-red-500 text-sm">{formik.errors.number}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                    Cidade
                </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.city && formik.errors.city ? (
                    <div className="text-red-500 text-sm">{formik.errors.city}</div>
                ) : null}
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                        Estado
                    </label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.state && formik.errors.state ? (
                        <div className="text-red-500 text-sm">{formik.errors.state}</div>
                    ) : null}
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                        CEP
                    </label>
                    <input
                        type="text"
                        name="zip"
                        id="zip"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.zip}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.zip && formik.errors.zip ? (
                        <div className="text-red-500 text-sm">{formik.errors.zip}</div>
                    ) : null}
                </div>
            </div>
            <div className="flex items-center justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Próximo
                </button>
            </div>
        </form>
    );
}

export default AddressForm;
