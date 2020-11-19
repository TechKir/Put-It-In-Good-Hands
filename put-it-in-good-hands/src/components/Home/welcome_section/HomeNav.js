import React,{useState, useContext} from 'react';
import classnames from 'classnames';
import ThingsImg from './ThingsImg';
import FormImg1 from '../../LeaveThingsSection/FormImg1';
//import { CSSTransition } from 'react-transition-group';
//import Navigation from 'react-sticky-nav';
import {AuthContext} from '../../../App';

import { Link, animateScroll as scroll } from "react-scroll";
import {
    Link as Link2,
    } from 'react-router-dom';

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive]=useState(false);
    const [scrooled, setScrooled]=useState(false);
    const [isHide,setIsHide]=useState(false);
    const { user, isForm, setIsForm} = useContext(AuthContext);

    const showNav = () =>{
        setIsOpen(prevState => !prevState)
        setIsActive(prevState => !prevState)
    };

    // TODO: STICKY NAV - BREAKES LAYOUT 
    // useEffect ( () => {
    //     window.addEventListener('scroll', () => {
    //         const isTop = window.scrollY < 170;           
    //         if (isTop == false){
    //             setScrooled(true)
    //         } else{
    //             setScrooled(false)
    //         }

    //         console.log(window.scrollY)
    //         const isHide = (window.scrollY > 70 && window.scrollY < 270);
    //         if(isHide == false){
    //             setIsHide(false)
    //         } else{
    //             setIsHide(true)
    //         }
    //     })
        
    //     const clearWindow = () => {
    //         window.removeEventListener('scroll')
    //     } 
        
    //     return () => clearWindow
    // },[])

//className={scrooled ? 'scrolled' : 'notScrolled'} className={isHide ? 'hideNav' : ''}
    return (
        <div className={classnames({hideNav: isHide,scrolled:scrooled})} id='section1'>
            <nav className={classnames('navigation',{hamburgerActive: isActive})}>
                {isForm ? <FormImg1/> : <ThingsImg/> }
                {user ?                                             
                    <div className='loginBox'>
                            <h1 className={classnames({positionRightCorrect:isForm})}>Witaj {user.email} !</h1>              
                        {/* <button className="btnLogin">     TODO: tylko w desktop                                  
                            <Link2
                                to="/leave-things">
                                Oddaj rzeczy
                            </Link2>        
                        </button> */}
                    </div> 
                    :
                    <div className={classnames('loginBox',{menuActive: isActive})}>
                        <button className="btnLogin">
                            <Link2
                                to="/login">
                                Zaloguj
                            </Link2>                 
                        </button>
                        <button className="btnLogin active">
                            <Link2
                                to="/registration">
                                Załóż konto
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
            {isForm ? 
            <ul className={classnames('navMenu',{menuActive: isActive})}>
                <li className="navOptions btnLogout" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >
                    <Link2
                        to="/">
                        Strona Główna
                    </Link2>                      
                </li> 
                <li className="navOptions">
                    <Link
                        activeClass="active"
                        to="section-form"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                        Formularz
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
                {user &&                     
                <li className="navOptions btnLogout" >
                    <Link2
                        to="/logout">
                        Wyloguj
                    </Link2>                      
                </li> }     
            </ul>
            :
            <ul className={classnames('navMenu',{menuActive: isActive})}>
                <li className="navOptions" >
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
                        Fundacje i organizacje
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
                {user &&                     
                <li className="navOptions btnLogout" >
                    <Link2
                        to="/logout">
                        Wyloguj
                    </Link2>                      
                </li> }     
            </ul>}             
        </div>
    );
};