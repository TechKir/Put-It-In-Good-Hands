import React,{useState, useContext, useEffect} from 'react';
import classnames from 'classnames';
import ThingsImg from './ThingsImg';
//import { CSSTransition } from 'react-transition-group';
import {AuthContext} from '../../../App';

import { Link, animateScroll as scroll } from "react-scroll";
import {
    HashRouter,
    Route,
    Link as Link2,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive]=useState(false);
    const { user, isHome, setIsHome} = useContext(AuthContext);

    useEffect( () => {
        setIsHome(true);
    },[])

    const showNav = () =>{
        setIsOpen(prevState => !prevState)
        setIsActive(prevState => !prevState)
    };

    if (isOpen){
        return (
            <>
                <nav className={classnames('navigation',{hamburgerActive: isActive})} id='section1'>
                    <ThingsImg/>
                    {user ?                                             
                        <div className='loginBox'>
                                <h1>Witaj {user.email} !</h1>              
                            {/* <button className="btnLogin">     TODO: tylko w desktop                                  
                                <Link2
                                    to="/leave-things">
                                    Oddaj rzeczy
                                </Link2>        
                            </button> */}
                        </div> :

                        <div className='loginBox'>
                            <button className="btnLogin">
                                <Link2
                                    to="/registration">
                                    Załóż konto
                                </Link2>                 
                            </button>
                            <button className="btnLogin">
                                <Link2
                                    to="/login">
                                    Zaloguj
                                </Link2>                
                            </button>
                        </div> 
                    }

                    <button className='hamburger' onClick={showNav}>
                        <span className='hamburgerBox'>
                            <span className='hamburgerInner'></span>
                        </span>
                    </button>                  
                </nav>
                {isHome ? 
                    <ul className='navMenu'>
                        <li className="navOptions">
                            <Link
                                activeClass="active"
                                to="section1"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Start
                            </Link>          
                        </li>
                        <li className="navOptions">
                            <Link
                                activeClass="active"
                                to="section2"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                O co chodzi?
                            </Link>
                        </li>
                        <li className="navOptions">
                            <Link
                                activeClass="active"
                                to="section3"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                o nas
                            </Link>
                        </li>
                        <li className="navOptions">
                            <Link
                                activeClass="active"
                                to="section4"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Fundacja i organizacje
                            </Link>
                        </li>
                        <li className="navOptions">
                            <Link
                                activeClass="active"
                                to="section5"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Kontakt
                            </Link>                      
                        </li>              
                    </ul> :
                    <ul className='navMenu'>
                        <li className="navOptions">
                            <Link2
                                to='section1'>
                                Start
                            </Link2>          
                        </li>
                        <li className="navOptions">
                            <Link2
                                to='section2'>
                                O co chodzi?
                            </Link2>
                        </li>
                        <li className="navOptions">
                            <Link2
                                to='section3'>
                                o nas
                            </Link2>
                        </li>
                        <li className="navOptions">
                            <Link2
                                to='section4'>
                                Fundacja i organizacje
                            </Link2>
                        </li>
                        <li className="navOptions">
                            <Link2
                                to='/'
                                >
                                Kontakt
                            </Link2>                      
                        </li>              
                    </ul> 
                }               
            </>
        )
    } else if (!isOpen){
        return (
            <nav className={classnames('navigation',{hamburgerActive: isActive})}>
                <ThingsImg/>
                <button className='hamburger' onClick={showNav}>
                    <span className='hamburgerBox'>
                        <span className='hamburgerInner'></span>
                    </span>
                </button>
            </nav>
        )
    }
}