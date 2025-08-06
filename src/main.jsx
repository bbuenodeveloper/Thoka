import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from './App.jsx'

import {register} from 'swiper/element/bundle'

register();
import 'swiper/css';
import 'swiper/css/autoplay';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App />} />
    </Routes> 
  </BrowserRouter>,
)
