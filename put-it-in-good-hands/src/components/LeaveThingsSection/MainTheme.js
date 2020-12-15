import React from 'react';
import decoration from '../../assets/Decoration.svg';

export default () => {
    return(
        <>
            <header className='mainTheme'>
                <h1>Oddaj rzeczy których już nie chcesz<br/>POTRZEBUJĄCYM</h1>
            </header>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
        </>
    )
}