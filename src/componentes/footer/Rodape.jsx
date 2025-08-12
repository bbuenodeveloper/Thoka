import { FaMapMarkerAlt, FaInstagram, FaWhatsapp, FaMailBulk, FaCopyright } from "react-icons/fa";
import { Link } from "react-router-dom"



function Rodape() {

    const telefone = '5511994136823'
    const redeSocial = 'https://www.instagram.com/somthoka/'


    function handleSubmit() {
        // motando a url do whatsapp que estou utilizando que precisa ser como esta abaixo so para click sem mensagem
        const url = `https://wa.me/${telefone}`
        // comando para abrir um nova janela com a url que estou enviando
        window.open(url, '_blank')

    }

    function instagram() {
        window.open(redeSocial, '_blank')
    }



    return (
        <footer>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 m-10">
                    <p onClick={instagram} className="cursor-pointer flex mt-3 items-center"><FaInstagram className="mr-2" />Instragram</p>
                    <p onClick={handleSubmit} className="cursor-pointer flex mt-3 items-center"><FaWhatsapp className="mr-2" />WhatsApp</p>
                    <p className='flex mt-3 items-center'><FaMailBulk className="mr-2" />thokasom@gmail.com</p>
                    <p className='flex mt-3 items-center'><FaMapMarkerAlt className='mr-2' /> Rua jose Pardelli, 19 - Parque Mandaqui</p>
                </div>
            </div>
            < p className = 'flex items-center justify-center text-xs mb-5' > <FaCopyright className='mr-2' />Desenvolvido por: Bruno Bueno</p >   
        </footer>
    )

}

export default Rodape
    