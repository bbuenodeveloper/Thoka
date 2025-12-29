import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IMaskInput } from 'react-imask';

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
    billing_zip: Yup.string().required('CEP obrigatório'),
    billing_street: Yup.string().required('Rua obrigatória'),
    billing_number: Yup.string().required('Número obrigatório'),
    billing_complemento: Yup.string(),
    billing_bairro: Yup.string().required('Bairro obrigatório'),
    billing_city: Yup.string().required('Cidade obrigatória'),
    billing_state: Yup.string().required('Estado obrigatório'),
});

function PaymentForm({ onSubmit, onBack, deliveryAddress }) {
    const [useDeliveryAddress, setUseDeliveryAddress] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            billing_zip: '',
            billing_street: '',
            billing_number: '',
            billing_complemento: '',
            billing_bairro: '',
            billing_city: '',
            billing_state: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    React.useEffect(() => {
        if (useDeliveryAddress && deliveryAddress) {
            formik.setValues({
                ...formik.values,
                billing_zip: deliveryAddress.zip || '',
                billing_street: deliveryAddress.street || '',
                billing_number: deliveryAddress.number || '',
                billing_complemento: deliveryAddress.complemento || '',
                billing_bairro: deliveryAddress.bairro || '',
                billing_city: deliveryAddress.city || '',
                billing_state: deliveryAddress.state || '',
            });
        } else {
            formik.setValues({
                ...formik.values,
                billing_zip: '',
                billing_street: '',
                billing_number: '',
                billing_complemento: '',
                billing_bairro: '',
                billing_city: '',
                billing_state: '',
            });
        }
    }, [useDeliveryAddress, deliveryAddress]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <h3 className="text-2xl font-bold mb-4 text-black text-center">Dados de Pagamento</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                    Número do Cartão
                </label>
                <IMaskInput
                    mask="0000 0000 0000 0000"
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    onAccept={(_value, mask) => formik.setFieldValue('cardNumber', mask.unmaskedValue)}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardNumber}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                    <div className="text-red-500 text-sm">{formik.errors.cardNumber}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
                    Nome
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
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                        Data de Validade
                    </label>
                    <IMaskInput
                        mask="MM/YY"
                        blocks={{
                            MM: {
                                mask: IMask.MaskedRange,
                                from: 1,
                                to: 12,
                            },
                            YY: {
                                mask: IMask.MaskedRange,
                                from: new Date().getFullYear() % 100,
                                to: 99,
                            },
                        }}
                        type="text"
                        name="expiryDate"
                        id="expiryDate"
                        placeholder="MM/AA"
                        onAccept={(value) => formik.setFieldValue('expiryDate', value)}
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
                    <IMaskInput
                        mask="000"
                        type="text"
                        name="cvv"
                        id="cvv"
                        onAccept={(value) => formik.setFieldValue('cvv', value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.cvv}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.cvv && formik.errors.cvv ? (
                        <div className="text-red-500 text-sm">{formik.errors.cvv}</div>
                    ) : null}
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-black text-center">Endereço de Cobrança</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_zip">
                    CEP
                </label>
                <IMaskInput
                    mask="00000-000"
                    type="text"
                    name="billing_zip"
                    id="billing_zip"
                    onAccept={(value) => formik.setFieldValue('billing_zip', value)}
                    onBlur={formik.handleBlur}
                    value={formik.values.billing_zip}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.billing_zip && formik.errors.billing_zip ? (
                    <div className="text-red-500 text-sm">{formik.errors.billing_zip}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_street">
                    Endereço
                </label>
                <input
                    type="text"
                    name="billing_street"
                    id="billing_street"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.billing_street}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.billing_street && formik.errors.billing_street ? (
                    <div className="text-red-500 text-sm">{formik.errors.billing_street}</div>
                ) : null}
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_number">
                        Número
                    </label>
                    <input
                        type="text"
                        name="billing_number"
                        id="billing_number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.billing_number}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.billing_number && formik.errors.billing_number ? (
                        <div className="text-red-500 text-sm">{formik.errors.billing_number}</div>
                    ) : null}
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_bairro">
                        Bairro
                    </label>
                    <input
                        type="text"
                        name="billing_bairro"
                        id="billing_bairro"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.billing_bairro}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.billing_bairro && formik.errors.billing_bairro ? (
                        <div className="text-red-500 text-sm">{formik.errors.billing_bairro}</div>
                    ) : null}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_complemento">
                    Complemento
                </label>
                <input
                    type="text"
                    name="billing_complemento"
                    id="billing_complemento"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.billing_complemento}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.billing_complemento && formik.errors.billing_complemento ? (
                    <div className="text-red-500 text-sm">{formik.errors.billing_complemento}</div>
                ) : null}
            </div>
            <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_city">
                        Cidade
                    </label>
                    <input
                        type="text"
                        name="billing_city"
                        id="billing_city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.billing_city}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.billing_city && formik.errors.billing_city ? (
                        <div className="text-red-500 text-sm">{formik.errors.billing_city}</div>
                    ) : null}
                </div>
                <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billing_state">
                        Estado
                    </label>
                    <IMaskInput
                        mask="aa"
                        prepare={(str) => str.toUpperCase()}
                        type="text"
                        name="billing_state"
                        id="billing_state"
                        onAccept={(value) => formik.setFieldValue('billing_state', value)}
                        onBlur={formik.handleBlur}
                        value={formik.values.billing_state}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.billing_state && formik.errors.billing_state ? (
                        <div className="text-red-500 text-sm">{formik.errors.billing_state}</div>
                    ) : null}
                </div>
            </div>

            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={useDeliveryAddress}
                        onChange={() => setUseDeliveryAddress(!useDeliveryAddress)}
                    />
                    <span className="ml-2 text-black text-sm">utilizar as informaçoes do endereço de entrega.</span>
                </label>
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                    Voltar
                </button>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    disabled={formik.isSubmitting}
                >
                    Pagar
                </button>
            </div>
        </form>
    );
}

export default PaymentForm;
