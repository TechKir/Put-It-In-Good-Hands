import React,{useEffect, useContext} from 'react';
import {AuthContext} from '../App';
import decoration from '../assets/Decoration.svg';
import {
    Link
    } from 'react-router-dom';

export default () => {

    const { setUser, setIsHome, setIsForm } = useContext(AuthContext);
    useEffect(() => {
        setUser(null);
        setIsHome(false);
        setIsForm(false);
    }, [setUser, setIsHome, setIsForm ]);

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