import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PokemonCard.css'
import colors from '../colors.json'

const PokemonCard = ({pokemonUrl}) => {

    const[pokemon, setPokemon] = useState({})

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(pokemonUrl)
        .then(res => setPokemon(res.data))
    },[pokemonUrl, setPokemon])
    

    const filterBackGroud = ()=>{
     let backActual = colors.filter(e=>{
        return e.type === pokemon.types?.[0].type.name
     });
     return backActual[0]?.background
 };

    return (
        <div className='pokemon-card' onClick={()=>navigate(`/pokemons/${pokemon.id}`)} style={{backgroundImage:filterBackGroud()}}>
            <div className="card-top">
                <img className='pokemon-img' src={pokemon.sprites?.other?.home.front_default} alt="" />
            </div>
            <div className="card-buttom">
                <div className="card-container">
                    <p className='p-name'>{pokemon?.name}</p>
                    <p className='p-type-detail'>{pokemon?.types?.[0].type.name}</p>
                    <p className='p-type'>Type</p>
                </div>
                <div className='skills' >
                    <div className='skills-content'>
                        <p className='skill-name'>HP</p>
                        <p className='skill-value' >{pokemon.stats?.[0].base_stat}</p>
                    </div>
                    <div className='skills-content'>
                        <p className='skill-name'>ATACK</p>
                        <p className='skill-value'>{pokemon.stats?.[1].base_stat}</p>
                    </div>
                    <div className='skills-content'>
                        <p className='skill-name'>DEFENSE</p>
                        <p className='skill-value'>{pokemon.stats?.[2].base_stat}</p>
                    </div>
                    <div className='skills-content'>
                        <p className='skill-name'>SPEED</p>
                        <p className='skill-value'>{pokemon.stats?.[5].base_stat}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;