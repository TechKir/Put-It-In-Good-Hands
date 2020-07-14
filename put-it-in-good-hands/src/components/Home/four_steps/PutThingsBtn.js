import React, {useContext} from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    useHistory,
    } from 'react-router-dom';
    import {AuthContext} from '../../../App'
    
export default () =>{
    const {user} = useContext(AuthContext);
    const history = useHistory()
    const handleOnClick = () => {
        const direction = user ? '/oddaj-rzeczy' : "/login"
        history.push(direction)
    }

    return (
        <div className='btnBox'>
            <button className='putThingsBtn' onClick={handleOnClick}>

                        ODDAJ RZECZY
  
            </button>
        </div>
    )
}