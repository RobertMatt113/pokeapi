import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import title from '../assets/title.svg'
import '../styles/PokemonDetails.css'
import colors from '../colors.json'


const PokemonDetails = () => {

    const[pokemon, setPokemon] = useState({})

    const {id} = useParams()

    const navigate = useNavigate()

    const backHome = () => {
        navigate('/pokedex')
    }

    const filterBackGroud = ()=>{
        let backActual = colors.filter(e=>{
           return e.type === pokemon.types?.[0].type.name
        });
        return backActual[0]?.background
    };

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => setPokemon(res.data))
    },[id]) 

    return (
        <div className='pokemon-details'>
            <header>
                <img className='pokedex-title' src={title} alt="" />
                <div className="white-circle">
                    <div className="black-circle"></div>
                </div>
                <div className="header-black"></div>
            </header>

            <button className='get-back-home' onClick={backHome}><i className='bx bx-left-arrow-alt'></i></button>

            <div className="responsive-container">
                <div className="main-details-container" style={{backgroundImage:filterBackGroud()}}>
                    <div className="details-top">
                        <img className='detail-pokemon-img' src={pokemon.sprites?.other.home.front_default} alt="" />
                    </div>
                    <div className="details-bottom">
                        <p className='details-id' >#{id}</p>
                        <p className='details-pokemon-name'>{pokemon?.name}</p>
                        <div className="height-container">
                            <div className="weight">
                                <p className='p-weight'>Weight</p>
                                <p className='p-size'>{pokemon?.weight}</p>
                            </div>
                            <div className="height">
                                <p className='p-weight'>Height</p>
                                <p className='p-size' >{pokemon?.height}</p>
                            </div>
                        </div>

                        <div className="type-container">
                            <div className="type">
                                <p className='p-type-details'>Type</p>
                                <div className="type-content">
                                    <div className='pokemon-type-container'>
                                        <p>{pokemon.types?.[0]?.type?.name}</p>
                                    </div>
                                    <div className='pokemon-type-container'>
                                        <p>{pokemon.types?.[1]?.type?.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="type-skills">
                                <p className='p-type-details'>Skills</p>
                                <div className="type-content">
                                    <div className='pokemon-skills-container'>
                                        <p>{pokemon.abilities?.[0].ability.name}</p>
                                    </div>
                                    <div className='pokemon-skills-container'>
                                        <p>{pokemon.abilities?.[1]?.ability.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="stats">
                        <p className='p-stats'>Stats</p>
                        <ul>
                            <li>
                                <div className="percent">
                                    <label htmlFor="file">HP</label>
                                    <p>{pokemon.stats?.[0].base_stat}/150</p>
                                </div>
                                <progress id="file" max="100" value={pokemon.stats?.[0].base_stat}></progress>
                            </li>
                            <li>
                                <div className="percent">
                                    <label htmlFor="file">Atack</label>
                                    <p>{pokemon.stats?.[1].base_stat}/150</p>
                                </div>
                                <progress className='progressBar'd="file" max="100" value={pokemon.stats?.[1].base_stat}></progress>
                            </li>
                            <li>
                                <div className="percent">
                                    <label htmlFor="file">Defense</label> <br />
                                    <p>{pokemon.stats?.[2].base_stat}/150</p>
                                </div>
                                <progress id="file" max="100" value={pokemon.stats?.[2].base_stat}></progress>
                            </li>
                            <li>
                                <div className="percent">
                                    <label htmlFor="file">Speed</label> <br />
                                    <p>{pokemon.stats?.[3].base_stat}/150</p>
                                </div>
                                <progress id="file" max="100" value={pokemon.stats?.[3].base_stat}></progress>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="movements">
                    <p>Movements</p>
                    <ul className='ul-map'>
                        {
                            pokemon.moves?.map(move => (
                                <li className='li-map' key={move.move.name}>{move.move.name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;