import React from 'react';
import decoration from '../../../assets/Decoration.svg'

export default () => {
    return(
        <>
            <h2 className='textUpDecoration'>
                Komu pomagamy?
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
        </>
    )
}