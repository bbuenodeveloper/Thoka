import logo from "../../../img/logo.png"
import { HashLink as Link } from 'react-router-hash-link'


function Nav() {
    return (
        <div id="home">
        <header className='flex justify-around items-center h-15  w-full fixed z-4 bg-black'>
            <Link to='#home'><img src={logo} alt='logo' className='cursor-pointer scale-50'/></Link>
            <nav>
                <ul>
                    <Link to='#home' className='mr-3 font-bold'>Home</Link>
                    <Link to='#servico' className='mr-3 font-bold'>Serviços</Link>
                    <Link to='#sobre' className='mr-2 font-bold'>Sobre</Link>
                    <Link to='#contato' className='font-bold mr-5'>Contato</Link>
                </ul>
            </nav>
        </header>
        </div>
    )
}

export default Nav