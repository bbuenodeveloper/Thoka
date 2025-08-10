import { useEffect } from 'react'
import servico1 from '../../../img/servico1.jpg'
import sobreimg from '../../../img/sobre.jpg'

function Conteudo() {

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
            <div id='servico' className='bg-red-700 h-full'>
                <h1 className='flex justify-center font-montserrat text-4xl font-bold text-white pt-4 invisivel' > Serviços</h1>
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

            <div id='sobre' className='flex justify-center pt-20 pb-20 border-b border-b-gray-600'>
                <div className=''>
                    <h1 className='text-center mb-15 mt-20 mr-10 font-montserrat font-bold text-3xl'>Quem somos</h1>
                    <p className='text-center  mr-15 w-100'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, impedit culpa? Aut asperiores, voluptatibus quaerat deserunt ex ipsa laboriosam 
                        obcaecati consequuntur odio repudiandae, quia commodi neque magnam beatae atque vero.</p>
                </div>
                <div>
                    <img src={sobreimg} alt='imagem referente ao sobre' className='w-100 h-100 rounded'/>
                </div>
            </div>


        </div>
    )

}

export default Conteudo