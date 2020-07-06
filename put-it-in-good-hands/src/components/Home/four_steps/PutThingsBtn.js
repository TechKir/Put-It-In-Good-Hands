import React from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';
    
export default () =>{
    return (
        <div className='btnBox'>
            <button className='putThingsBtn'>
                <Link
                    to="/login">
                        ODDAJ RZECZY
                </Link>    
            </button>
        </div>
    )
}