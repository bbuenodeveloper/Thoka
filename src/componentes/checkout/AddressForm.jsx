import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IMaskInput } from 'react-imask';

const validationSchema = Yup.object({
    cpf: Yup.string().required('CPF obrigatório'),
    birthDate: Yup.string().required('Data de Nascimento obrigatória'),
    street: Yup.string().required('Rua obrigatória'),
    number: Yup.string().required('Número obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('Bairro obrigatório'),
    city: Yup.string().required('Cidade obrigatória'),
    state: Yup.string().required('Estado obrigatório'),
    zip: Yup.string().required('CEP obrigatório'),
});

function AddressForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            cpf: '',
            birthDate: '',
            street: '',
            number: '',
            complemento: '',
            bairro: '',
            city: '',
            state: '',
            zip: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    const handleCepBlur = async (e) => {
        formik.handleBlur(e);
        const cep = e.target.value.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    formik.setFieldValue('street', data.logradouro);
                    formik.setFieldValue('bairro', data.bairro);
                    formik.setFieldValue('city', data.localidade);
                    formik.setFieldValue('state', data.uf);
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP", error);
            }
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <h3 className="text-2xl font-bold mb-4 text-black text-center">Dados Pessoais</h3>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                        CPF
                    </label>
                    <IMaskInput
                        mask="000.000.000-00"
                        type="text"
                        name="cpf"
                        id="cpf"
                        onAccept={(value) => formik.setFieldValue('cpf', value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.cpf}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.cpf && formik.errors.cpf ? (
                        <div className="text-red-500 text-sm">{formik.errors.cpf}</div>
                    ) : null}
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                        Data de Nascimento
                    </label>
                    <IMaskInput
                        mask="00/00/0000"
                        type="text"
                        name="birthDate"
                        id="birthDate"
                        onAccept={(value) => formik.setFieldValue('birthDate', value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.birthDate}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.birthDate && formik.errors.birthDate ? (
                        <div className="text-red-500 text-sm">{formik.errors.birthDate}</div>
                    ) : null}
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black text-center">Endereço de Entrega</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                    CEP
                </label>
                <IMaskInput
                    mask="00000-000"
                    type="text"
                    name="zip"
                    id="zip"
                    onAccept={(value) => formik.setFieldValue('zip', value)}
                    onBlur={handleCepBlur}
                    value={formik.values.zip}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.zip && formik.errors.zip ? (
                    <div className="text-red-500 text-sm">{formik.errors.zip}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                    Endereço
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
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
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
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bairro">
                        Bairro
                    </label>
                    <input
                        type="text"
                        name="bairro"
                        id="bairro"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bairro}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.bairro && formik.errors.bairro ? (
                        <div className="text-red-500 text-sm">{formik.errors.bairro}</div>
                    ) : null}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complemento">
                    Complemento
                </label>
                <input
                    type="text"
                    name="complemento"
                    id="complemento"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.complemento}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.complemento && formik.errors.complemento ? (
                    <div className="text-red-500 text-sm">{formik.errors.complemento}</div>
                ) : null}
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
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
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                        Estado
                    </label>
                    <IMaskInput
                        mask="aa"
                        prepare={(str) => str.toUpperCase()}
                        type="text"
                        name="state"
                        id="state"
                        onAccept={(value) => formik.setFieldValue('state', value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.state && formik.errors.state ? (
                        <div className="text-red-500 text-sm">{formik.errors.state}</div>
                    ) : null}
                </div>
            </div>
            <div className="flex items-center justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                    Próximo
                </button>
            </div>
        </form>
    );
}

export default AddressForm;
