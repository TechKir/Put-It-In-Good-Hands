import React from 'react';
import ThingsImg from './Home/welcome_section/ThingsImg';
import {
    Link
    } from 'react-router-dom';

export default () => {
    return (
        <nav className='navigation'>
            <ThingsImg/>
            <div className='btnBoxMenu'>
                <button className='btn'>
                    <Link
                        to="/">
                        Strona główna
                    </Link> 
                </button>      
            </div>                               
        </nav>
    )
}
