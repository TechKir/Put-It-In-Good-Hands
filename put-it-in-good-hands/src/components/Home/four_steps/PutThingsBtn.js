import React, {useContext} from 'react';
import {AuthContext} from '../../../App';
import {
    useHistory
    } from 'react-router-dom';
    
export default () =>{

    const {user, setIsTogether} = useContext(AuthContext);
    const history = useHistory();

    const handleOnClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsTogether(false);
        const direction = user ? '/leave-things' : "/login";
        history.push(direction);
    };

    return (
        <div className='btnBox'>
            <button className='putThingsBtn' onClick={handleOnClick}>
                ODDAJ RZECZY
            </button>
        </div>
    )
}