import React from 'react';
import decoration from '../../../assets/Decoration.svg'

export default () => {
    return(
        <>
            <h2 className='textUpDecoration' id='section4'>
                Komu pomagamy?
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
        </>
    )
}