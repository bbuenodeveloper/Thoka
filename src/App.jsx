import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Nav from './componentes/header/Nav';
import Rodape from './componentes/footer/Rodape';
import Home from './pages/Home';
import './App.css';
import { AuthContext } from './context/AuthContext'; // Only import AuthContext

function App() {
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext

  return (
    <div className="App">
      <Nav />
      {isLoggedIn ? (
        // Render a blank page content when logged in
        <main className="flex-grow flex items-center justify-center p-4">
          <p className="text-xl text-white">Bem-vindo(a) à sua área logada!</p>
        </main>
      ) : (
        // Render the Home page when not logged in
        <Routes>
          <Route path='/' element={ <Home />} />
        </Routes>
      )}
      <Rodape />
    </div>
  );
}

export default App;