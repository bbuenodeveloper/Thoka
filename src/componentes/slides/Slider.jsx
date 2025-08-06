import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'



function Slider() {

 const data = [
    { id: '1', image: '../img/slide1.png' },
    { id: '2', image: '../img/slide2.png' },
    { id: '3', image: '../img/slide3.png' }
  ]

  return (

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
  )

}

export default Slider