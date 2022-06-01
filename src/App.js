import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Pokedex from './components/Pokedex';
import ProtectedRoutes from './components/ProtectedRoutes';
import PokemonDetails from './components/PokemonDetails';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <HashRouter>
      <div className="routes-container">
        <Routes>
          <Route path='/' element={<UserLogin/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokedex/>}/>
            <Route path='/pokemons/:id' element={<PokemonDetails/>}/>
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
