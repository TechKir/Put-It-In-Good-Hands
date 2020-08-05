import React,{useContext} from 'react';
import {AuthContext} from '../../../App';
import {
    useHistory,
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {
    const {user, setIsTogether}=useContext(AuthContext)

    return(
        <>
            {user ? 
            <div className='leaveStuffBox'>
                <button className="btn" onClick={() => setIsTogether(false)}>
                    <Link
                        to="/leave-things">
                            ODDAJ RZECZY
                    </Link>                 
                </button>
                <button className="btn" onClick={() => setIsTogether(true)}>
                    <Link
                    to="/leave-things">
                        ZORGANIZUJ ZBIÓRKĘ
                    </Link>                
                </button>
            </div>   
            : 
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
            }
        </>
    )
}