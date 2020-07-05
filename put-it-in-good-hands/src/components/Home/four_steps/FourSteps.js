import React from 'react';
import decoration from '../../../assets/Decoration.svg'

export default () => {
    return(
        <>
            <h2 className='textUpDecoration'>
                Wystarczą 4 proste kroki
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
        </>
    )
}