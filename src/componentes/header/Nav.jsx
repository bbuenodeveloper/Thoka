import logo from "../../../img/logo.png"
import  {  HashLink as Link  }  from  'react-router-hash-link'


function Nav() {
    return (
        
            <header className='flex justify-around items-center h-15 bg-black border-b border-b-gray-600'>

                <img src={logo} alt='logo' className='cursor-pointer scale-50' />
                <nav>
                    <ul>
                        <Link to='#servico' className='mr-3 font-bold'>Serviços</Link>
                        <Link to='#sobre' className='mr-2 font-bold'>Sobre</Link>
                        <Link className='font-bold mr-5'>Contato</Link>
                    </ul>
                </nav>
            </header>
        
    )
}

export default Nav