import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import title from '../assets/title.svg'
import '../styles/Pokedex.css'
import PokemonCard from './PokemonCard'
import { useNavigate } from 'react-router-dom';

const Pokedex = () => {

    const user = useSelector((state) => state.user);

    const[pokemonSearch, setPokemonSearch] = useState("")

    const[pokemons, setPokemons] = useState([])

    const [types, setTypes] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126') //theres 1126 pokemons in total
        .then(res => setPokemons(res.data.results))

        axios
      .get("https://pokeapi.co/api/v2/type/")
      .then(res => setTypes(res.data.results));
    },[])

  

    const filter = (e) => {
        if (e.target.value !== "Mostrar todos") {
          axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
        } else {
          axios
            .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
            .then((r) => {
                setPokemons(r.data.results);
            });
        }
      };

    const search = () => {
        navigate(`/pokemons/${pokemonSearch}`)
    }

    const backLogin = () => {
        navigate('/')
    }

    const[page, setPage] = useState(1)
    const pokemonNumber = 16;
    const lastIndex = pokemonNumber * page;
     const firstIndex = lastIndex - pokemonNumber;
     const pokemonPagination = pokemons.slice(firstIndex, lastIndex);

    const lastPage = Math.ceil(pokemons.length / pokemonNumber);
    const numbers = [];

    for(let i=1; i<=lastPage; i++){
        if(i < page + 5 && i > page - 5){
            numbers.push(i);
        }
    }
    
    return (
        <div className='pokedex'>
            <header>
                <img className='pokedex-title' src={title} alt="" />
                <div className="white-circle">
                    <div className="black-circle"></div>
                </div>
                <div className="header-black"></div>
            </header>

            <button className='get-back-login' onClick={backLogin}><i className='bx bx-left-arrow-alt'></i></button>

            <div className="pokemons-container">
                <p className='p-welcome'>
                    <b>Welcome {user}! </b>
                    You can find your favorite pokemon here.
                </p>

                <div className="search-box">
                    <input 
                    type="text"
                    onChange={e => setPokemonSearch(e.target.value)}
                    placeholder='search pokemon'
                    />
                    <button onClick={search}>Search</button>
                </div>

                <select className='search-pokemon-type' onChange={filter}>
                    <option>Show all</option>
                    {types.map((type) => (
                    <option className='select-option' key={type.name} value={type.url}>
                        <h2>{type.name}</h2>
                    </option>
                    ))}
                </select>
 
                        {/* <div className='map-container'>
                            {
                                pokemonPagination.map(just => (
                                    <li key={just.url !== undefined ? just.url : just.pokemon.url}>
                                        <PokemonCard pokemonUrl={just.url !== undefined ? just.url : just.pokemon.url}/>
                                    </li>
                                ))
                            }
                        </div> */}
    
                <div className="map-container">
                    {
                        pokemonPagination.map(just=>(
                            <PokemonCard
                            key={just.url !== undefined ? just.url : just.pokemon.url}
                            pokemonUrl={just.url !== undefined ? just.url : just.pokemon.url}/>
                        ))
                    }
                </div>



            </div>
            
                <div className="pagination">
                    <button className='change-page-btn' onClick={() => setPage(page - 1)} disabled={page === 1}><i className='bx bxs-chevron-left'></i></button>
                    {
                        numbers.map(number => (
                            <button className='page-btn' key={number} onClick={()=>setPage(number)}>
                                {number}
                            </button>
                        ))
                    }
                    <button className='change-page-btn' onClick={() => setPage(page + 1)} disabled={page === lastPage}><i className='bx bxs-chevron-right'></i></button>
                </div>
        </div>
    );
};

export default Pokedex;