import '../../src/App.css'
import Slider from '../componentes/slides/Slider.jsx'
import Contato from '../componentes/contato/Contato.jsx'
import Marketplace from '../componentes/marketplace/Marketplace.jsx' // Import Marketplace

function Home() {
    return (
        <div>
            <Slider />
            <Marketplace /> {/* Render the Marketplace component */}
            <Contato />
        </div>
    )
}

export default Home

