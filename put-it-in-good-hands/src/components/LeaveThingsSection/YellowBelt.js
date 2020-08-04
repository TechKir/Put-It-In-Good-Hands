import React,{useState, useEffect,} from 'react';

const YellowBelt = props => {

    return (
        <div className='yellowBelt'>
            <h1>Ważne!</h1>
            <p>{props.text}</p>
        </div>
    )
}

export default YellowBelt