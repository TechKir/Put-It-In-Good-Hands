import React,{useState, useEffect, useContext} from 'react';
import decoration from '../assets/Decoration.svg';
import LoginNav from './LoginNav';
import {AuthContext} from '../App';
import classnames from 'classnames';
import ThingsImg from './Home/welcome_section/ThingsImg';
import {
    useHistory,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const { setUser,setIsHome,setIsForm } = useContext(AuthContext);

    useEffect( () => {
        setIsHome(false);
        setIsForm(false);
    },[])

    const [activeLoginBtn]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailWarning,setEmailWarning]=useState(false);
    const [passwordWarning,setPasswordWarning]=useState(false);
    const [alertText, setAlertText]=useState('');

    const handleEmail= (e) => {
        setEmail(e.target.value)
    };

    const handlePassword= (e) => {
        setPassword(e.target.value)
    };

    //Login process validation:
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailWarning(false);
        setPasswordWarning(false);

        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        if(validateEmail(email) == false){
            e.preventDefault()
            setAlertText('Wprowadzony email jest nieprawidłowy')
            setEmailWarning(true)
        } else if(password.length < 6){
            e.preventDefault()
            setAlertText('Wprowadzone hasło jest za krótkie!')
            setPasswordWarning(true)
        } else {
            fetch(`http://localhost:3005/users?email=${email}&password=${password}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:',data);
                    if(data.length>0){
                        history.push('/')
                        setUser(data[0])
                    } else if ( data.length==0){
                        setAlertText('Wprowadzone hasło jest nieprawidłowe lub nie założyłeś jeszcze konta')
                        setPasswordWarning(true)
                    }
                })
                .catch(error => {
                    console.log('Error',error);
                })
        };
    };

    return(
        <>
            <LoginNav/>
            
            <h2 className='textUpDecoration' id='section4'>
                Zaloguj się
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>

            <form onSubmit={handleSubmit} className='formMargin'>
                <div className='logFormBox'>
                    <div className='userBox'>

                        <label>Email</label>
                        <input type="text" name="email" placeholder='e-mail' value={email} onChange={handleEmail}></input>
                        <div>{emailWarning ? <strong>{alertText}</strong> : null}</div>

                        <label>Hasło</label>
                        <input type="password" name="hasło" placeholder='hasło' value={password} onChange={handlePassword}></input>
                        <div>{passwordWarning ? <strong>{alertText}</strong> : null}</div>

                    </div>
                </div>
                
                <div className='submitBox'>

                    <button className="noBorderBtn">
                        <Link
                            to="/registration">
                                Załóż konto
                        </Link>                 
                    </button>

                    <button type='submit' className={classnames('noBorderBtn', { active: activeLoginBtn })}>
                        Zaloguj się
                    </button>

                </div>
            </form>
        </>
    )
}