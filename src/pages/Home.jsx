import '../../src/App.css'
import Slider from '../componentes/slides/Slider.jsx'
import Contato from '../componentes/contato/Contato.jsx'
import Conteudo from '../componentes/conteudo/Conteudo.jsx'

function Home() {
    return (
        <div>
            <Slider />
            <Conteudo />
            <Contato />
        </div>
    )
}

export default Home

