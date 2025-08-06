import './App.css'
import { Link } from "react-router-dom"
import logo from "../img/logo.png"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import servico1 from '../img/servico1.jpg'
import { useEffect } from 'react'


function App() {

  const data = [
    { id: '1', image: '../img/slide1.png' },
    { id: '2', image: '../img/slide2.png' },
    { id: '3', image: '../img/slide3.png' }
  ]

  useEffect( () => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>{
        if(entry.isIntersecting){
          console.log('estou aqui')
          entry.target.classList.add('show')
        }else {
          console.log('nao estou')
          entry.target.classList.remove('show')
        }
      })
    });

    intersectionObserver.observe(document.querySelector('.invisivel'));

    return() => intersectionObserver.disconnect();


  })

  return (
    <div>
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

      <Swiper
        modules={Autoplay}
        slidesPerView={1}
        autoplay={{ delay: 10000 }}

      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='relative'>
              <img src={item.image} alt='traga pra nós seu carro' className='h-170 w-full' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='bg-yellow-500 h-full p-5 flex justify-around'>
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
  )
}

export default App


