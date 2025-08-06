import logo from "../../../img/logo.png"
import { Link } from "react-router-dom"


function Nav() {
    return (
        
            <header className='flex justify-around items-center h-15 bg-black border-b border-b-gray-600'>

                <img src={logo} alt='logo' className='cursor-pointer scale-50' />
                <nav>
                    <ul>
                        <Link className='mr-3 font-bold'>Serviços</Link>
                        <Link className='mr-2 font-bold'>Sobre</Link>
                        <Link className='font-bold mr-5'>Contato</Link>
                    </ul>
                </nav>
            </header>
        
    )
}

export default Nav