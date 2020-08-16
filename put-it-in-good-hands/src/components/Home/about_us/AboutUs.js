import React from 'react';
import decoration from '../../../assets/Decoration.svg';
import signature from '../../../assets/Signature.svg'
export default () =>{
    return (
        <div className='aboutUs'>
            <h2>
                O nas
            </h2>
            <div>
                <img src={decoration} alt='decoration'/>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus cum deleniti nihil rem? Ullam rem expedita itaque sit quia porro.</p>
            <div className='signature'>
                <img src={signature} alt='signature'/>
            </div>
        </div>
    )
}