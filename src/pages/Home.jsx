import '../../src/App.css'
import { Link } from "react-router-dom"
import { useEffect } from 'react'
import servico1 from '../../img/servico1.jpg'
import Slider from '../componentes/slides/Slider.jsx'
import Nav from '../componentes/header/Nav.jsx'

function Home() {

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('estou aqui')
                    entry.target.classList.add('show')
                } else {
                    console.log('nao estou')
                    entry.target.classList.remove('show')
                }
            })
        });

        const elements = document.querySelectorAll('.invisivel')

        elements.forEach((Element) => intersectionObserver.observe(Element))

        return () => intersectionObserver.disconnect();


    })


    return (
        <div>
            <Nav />

            <Slider />

            <div className='bg-yellow-500 h-full'>
                <h1 className='flex justify-center font-montserrat text-4xl font-bold text-black pt-4 invisivel' > Serviços</h1>
                <div className='p-5 flex justify-around'>
                    <div className='grid grid-cols-3 gap-10 invisivel'>
                        <div className='m-5'>
                            <img src={servico1} alt='serviços que realizamos' className='h-50 rounded-t-xl' />
                            <div className='w-50 p-5 bg-cyan-900 rounded-b-xl'>
                                <p className='text-xs font-bold h-15 text-center tracking-wide'>Alguns de nossos serviços que realizamos para deixar seu carro perfeito!!</p>
                            </div>
                        </div>
                        <div className='m-5'>
                            <img src={servico1} alt='serviços que realizamos' className='h-50 rounded-t-xl' />
                            <div className='w-50 p-5 bg-cyan-900 rounded-b-xl'>
                                <p className='text-xs font-bold h-15 text-center tracking-wide'>Alguns de nossos serviços que realizamos para deixar seu carro perfeito!!</p>
                            </div>
                        </div>
                        <div className='m-5'>
                            <img src={servico1} alt='serviços que realizamos' className='h-50 rounded-t-xl' />
                            <div className='w-50 p-5 bg-cyan-900 rounded-b-xl'>
                                <p className='text-xs font-bold h-15 text-center tracking-wide'>Alguns de nossos serviços que realizamos para deixar seu carro perfeito!!</p>
                            </div>
                        </div>
                        <div className='m-5'>
                            <img src={servico1} alt='serviços que realizamos' className='h-50 rounded-t-xl' />
                            <div className='w-50 p-5 bg-cyan-900 rounded-b-xl'>
                                <p className='text-xs font-bold h-15 text-center tracking-wide'>Alguns de nossos serviços que realizamos para deixar seu carro perfeito!!</p>
                            </div>
                        </div>
                        <div className='m-5'>
                            <img src={servico1} alt='serviços que realizamos' className='h-50 rounded-t-xl' />
                            <div className='w-50 p-5 bg-cyan-900 rounded-b-xl'>
                                <p className='text-xs font-bold h-15 text-center tracking-wide'>Alguns de nossos serviços que realizamos para deixar seu carro perfeito!!</p>
                            </div>
                        </div>
                        <div className='m-5'>
                            <img src={servico1} alt='serviços que realizamos' className='h-50 rounded-t-xl' />
                            <div className='w-50 p-5 bg-cyan-900 rounded-b-xl'>
                                <p className='text-xs font-bold h-15 text-center tracking-wide'>Alguns de nossos serviços que realizamos para deixar seu carro perfeito!!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home

