import '../../src/App.css'
import { Link } from "react-router-dom"
import Slider from '../componentes/slides/Slider.jsx'
import Nav from '../componentes/header/Nav.jsx'
import Conteudo from '../componentes/conteudo/Conteudo.jsx'

function Home() {




    return (
        <div>
            <Nav />
            <Slider />
            <Conteudo />
        </div>
    )

}

export default Home

