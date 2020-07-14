import React,{useState, useContext} from 'react';
import classnames from 'classnames';
import ThingsImg from './ThingsImg';
import { CSSTransition } from 'react-transition-group';
import {AuthContext} from '../../../App'

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
    const { user } = useContext(AuthContext)


    const showNav = () =>{
        
        setIsOpen(prevState => !prevState)
        setIsActive(prevState => !prevState)
    }

    if (isOpen){
        return (
            <>
                <nav className={classnames('navigation',{hamburgerActive: isActive})} id='section1'>
                    <ThingsImg/>
                    {user ?                                             
                        <div className='loginBox'>
                            <button className="btnLogin">
                                    Witaj użytkowniku               
                            </button>
                            <button className="btnLogin">
                                    Oddaj rzeczy              
                            </button>
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
                </ul> 
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

// CSSTransition     
//             in={showNav}
//             timeout={300}
//             classNames="hamburgerActive"
//             unmountOnExit
//             onEnter={() => setIsActive(false)}
//             onExited={() => setIsActive(true)}

//good code:
// import React,{useState} from 'react';
// import classnames from 'classnames';
// import ThingsImg from './ThingsImg';
// import { CSSTransition } from 'react-transition-group';

// import { Link, animateScroll as scroll } from "react-scroll";
// import {
//     HashRouter,
//     Route,
//     Link as Link2,
//     Switch,
//     NavLink,
//     } from 'react-router-dom';

// export default () => {
//     const [isOpen, setIsOpen] = useState(false)
//     const [isActive, setIsActive]=useState(false)


//     const showNav = () =>{
//         setIsOpen(prevState => !prevState)
//         setIsActive(prevState => !prevState)
//     }

//     if (isOpen){
//         return (
//             <>
//                 <nav className={classnames('navigation',{hamburgerActive: isActive})} id='section1'>
//                     <ThingsImg/>
//                     <div className='loginBox'>
//                         <button className="btnLogin">
//                             <Link2
//                                 to="/registration">
//                                 Załóż konto
//                             </Link2>                 
//                         </button>
//                         <button className="btnLogin">
//                             <Link2
//                                 to="/login">
//                                 Zaloguj
//                             </Link2>                
//                         </button>
//                     </div>
//                     <button className='hamburger' onClick={showNav}>
//                         <span className='hamburgerBox'>
//                             <span className='hamburgerInner'></span>
//                         </span>
//                     </button>
//                 </nav>
//                 <ul className='navMenu'>
//                     <li className="navOptions">
//                         <Link
//                             activeClass="active"
//                             to="section1"
//                             spy={true}
//                             smooth={true}
//                             offset={-70}
//                             duration={500}>
//                             Start
//                         </Link>          
//                     </li>
//                     <li className="navOptions">
//                         <Link
//                             activeClass="active"
//                             to="section2"
//                             spy={true}
//                             smooth={true}
//                             offset={-70}
//                             duration={500}>
//                             O co chodzi?
//                         </Link>
//                     </li>
//                     <li className="navOptions">
//                         <Link
//                             activeClass="active"
//                             to="section3"
//                             spy={true}
//                             smooth={true}
//                             offset={-70}
//                             duration={500}>
//                             o nas
//                         </Link>
//                     </li>
//                     <li className="navOptions">
//                         <Link
//                             activeClass="active"
//                             to="section4"
//                             spy={true}
//                             smooth={true}
//                             offset={-70}
//                             duration={500}>
//                             Fundacja i organizacje
//                         </Link>
//                     </li>
//                     <li className="navOptions">
//                         <Link
//                             activeClass="active"
//                             to="section5"
//                             spy={true}
//                             smooth={true}
//                             offset={-70}
//                             duration={500}>
//                             Kontakt
//                         </Link>                      
//                     </li>              
//                 </ul> 
//             </>
//         )
//     } else if (!isOpen){
//         return (
//             <nav className={classnames('navigation',{hamburgerActive: isActive})}>
//                 <ThingsImg/>
//                 <button className='hamburger' onClick={showNav}>
//                     <span className='hamburgerBox'>
//                         <span className='hamburgerInner'></span>
//                     </span>
//                 </button>
//             </nav>
//         )
//     }
// }

// // CSSTransition     
// //             in={showNav}
// //             timeout={300}
// //             classNames="hamburgerActive"
// //             unmountOnExit
// //             onEnter={() => setIsActive(false)}
// //             onExited={() => setIsActive(true)}