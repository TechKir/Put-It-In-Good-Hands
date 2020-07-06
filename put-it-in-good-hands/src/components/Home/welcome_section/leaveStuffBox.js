import React from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {
    return(
        <div className='leaveStuffBox'>
            <button className="btn">
                <Link
                    to="/login">
                        ODDAJ RZECZY
                </Link>                 
            </button>
            <button className="btn">
                <Link
                to="/login">
                    ZORGANIZUJ ZBIÓRKĘ
                </Link>                
            </button>
        </div>
    )
}