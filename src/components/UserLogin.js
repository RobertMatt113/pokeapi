import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import title from '../assets/title.svg'
import '../styles/UserLogin.css'

const UserLogin = () => {

    const[userName, setUserName] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getName = ()=> {
        dispatch(changeUser(userName))
        navigate("/pokedex")
    }

    return (
        <div className='user-login'>
            <div className="main-content">
                <img src={title} alt="" />

                <h1>¡Hi trainer!</h1>
                <p>Enter your name to start</p>
                
                <div className="enter-container">
                    <input 
                    type="text" 
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="Your name"
                    />
                    <button onClick={getName}>Start</button>
                </div>
            </div>
            <footer className='footer'>
                <div className="footer1">
                    <div className="white-circle-login">
                        <div className="black-circle-login"></div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserLogin;