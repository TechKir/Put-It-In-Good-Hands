import React,{useState,useEffect} from 'react';
import classNames from 'classnames';

export default () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive]=useState(false)


    const showNav = () =>{
        setIsOpen(prevState => !prevState)
        setIsActive(prevState => !prevState)
    };

    return (
        <>
            <nav className={classNames('navigation',{hamburgerActive: isActive})}>
                <div className='homeImg'></div>
                <button className='hamburger' onClick={showNav}>
                    <span className='hamburgerBox'>
                        <span className='hamburgerInner'></span>
                    </span>
                </button>
            </nav>
            <ul className={classNames('navMenu', {hiddenMenu: isOpen})}>
                <li className="navOptions">Start</li>
                <li className="navOptions">O co chodzi?</li>
                <li className="navOptions">O nas</li>
                <li className="navOptions">Fundacja i organizacje</li>
                <li className="navOptions">Kontakt</li>
            </ul> 
        </>
    )
}
