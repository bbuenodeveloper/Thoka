import '../../src/App.css'
import Slider from '../componentes/slides/Slider.jsx'
import Nav from '../componentes/header/Nav.jsx'
import Conteudo from '../componentes/conteudo/Conteudo.jsx'
import Contato from '../componentes/contato/Contato.jsx'
import Rodape from '../componentes/footer/Rodape.jsx'

function Home() {




    return (
        <div>
            <Nav />
            <Slider />
            <Conteudo />
            <Contato />
            <Rodape />
        </div>
    )

}

export default Home

