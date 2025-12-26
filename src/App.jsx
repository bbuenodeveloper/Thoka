import { Routes, Route } from "react-router-dom";
import Nav from './componentes/header/Nav';
import Rodape from './componentes/footer/Rodape';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={ <Home />} />
      </Routes>
      <Rodape />
    </div>
  );
}

export default App;