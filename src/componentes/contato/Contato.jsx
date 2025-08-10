import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useRef, useState } from 'react'




function Contato() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAJarBm-hwut6E_dKp2B5y2TM6f-4HzXJU',
    })

    const position = {
        lat: -23.478794651307634,
        lng: -46.63243697208867
    }

    const nomeRef = useRef()
    const mensagemRef = useRef()
    const telefone = '5511994136823'

    //contador de caracteres
    const [charCount, setCharCount] = useState(0)
    //limite de caracteres
    const charLimit = 200

    function handleSubmit(event) {
        event.preventDefault()

        // validação se os campos estão preenchidos
        if (!nomeRef.current.value == '' && !mensagemRef.current.value == '') {

            // montando a mensagem que vou receber no whatsapp
            const texto = `Olá! Me chamo ${nomeRef.current.value}, ${mensagemRef.current.value}`
            // formatando a mensagem pois não pode ter espaços no texto, com o comando "encodeURIComponent"
            const msgFormatada = encodeURIComponent(texto)
            // motando a url do whatsapp que estou utilizando que precisa ser como esta abaixo
            const url = `https://wa.me/${telefone}?text=${msgFormatada}`
            // comando para abrir um nova janela com a url que estou enviando
            window.open(url, '_blank')
            // depois de tudo realizado estou pedindo para resetar os campos de input e textarea
            nomeRef.current.value = ''
            mensagemRef.current.value = ''
        } else {
            alert('Preencha os campos.')
        }
    }


    return (
        <div id='contato' className=' border-b border-b-gray-600'>
            <h1 className='text-center font-montserrat text-4xl font-bold text-white pt-10' >Contato</h1>
            <div className='h-full flex justify-center pt-20 pb-15'>
                <div className='h-100 w-100 mr-15'>
                    {
                        isLoaded ? (
                            < GoogleMap
                                mapContainerStyle={{ width: "100%", height: "100%" }}
                                center={position}
                                zoom={15}
                            >

                                <Marker position={position} />
                            </ GoogleMap >
                        ) : (
                            < > </ >
                        )
                    }
                </div>
                <form className='flex flex-col bg-indigo-900 w-100 h-100 rounded gap-3 p-4 items-center'>
                    <input placeholder='Digite seu nome' type="text" ref={nomeRef} className='placeholder-white border border-gray-400 w-full p-2 rounded-2xl outline-0 cursor-pointer mt-5' />
                    <textarea placeholder='Digite sua mensagem' type="text" ref={mensagemRef} maxLength={charLimit}
                        onChange={(e) => setCharCount(e.target.value.length)}
                        className='placeholder-white border border-gray-400 w-full h-50 p-2 rounded-2xl outline-0 cursor-pointe resize-none cursor-pointer' />{charCount}/{charLimit}
                    <button onClick={handleSubmit} className='bg-red-700 w-50 p-2 rounded-2xl text-center font-bold font-montserrat hover:scale-110 tracking-wide'>Fale conosco</button>
                </form>
            </div>
        </div>
    )


}


export default Contato



