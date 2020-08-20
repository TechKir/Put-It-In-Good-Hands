import React,{useEffect, useContext} from 'react';
import {AuthContext} from '../App';
import decoration from '../assets/Decoration.svg';
import ThingsImg from './Home/welcome_section/ThingsImg';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {

    const { setUser, setIsHome, setIsForm } = useContext(AuthContext);
    useEffect(() => {
        setUser(null);
        setIsHome(false);
        setIsForm(false);
    }, []);

    return(
        <> 
            <h2 className='textUpDecoration logMarginCorrect fontCorrect' id='section4'>
                Wylogowanie nastąpiło <br/> pomyślnie!
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
            <div className='btnBox'>
                <button className='mainPageBtn'>
                    <Link
                        to="/">
                            Strona główna
                    </Link>                    
                </button>
            </div>
        </>
    )
}