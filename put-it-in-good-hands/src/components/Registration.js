import React,{useState, useEffect, useContext} from 'react';
import decoration from '../assets/Decoration.svg';
import classnames from 'classnames';
import LoginNav from './LoginNav';
import {AuthContext} from '../App';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';


export default () => {

    const {setIsHome, setIsForm} = useContext(AuthContext);
    useEffect( () => {
        setIsHome(false);
        setIsForm(false);
    },[])

    const [activeRegBtn]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [repeatPassword, setRepeatPassword]=useState('');
    const [alertText, setAlertText]=useState('');

    const [passwordWarning,setPasswordWarning]=useState(false);
    const [repeatPasswordWarning,setRepeatPasswordWarning]=useState(false);
    const [emailWarning,setEmailWarning]=useState(false);
    const [showSuccessText,setShowSuccessText]=useState(false);

    const handleEmail= (e) => {
        setEmail(e.target.value)
    };

    const handlePassword= (e) => {
        setPassword(e.target.value)
    };

    const handleRepeatPassword= (e) => {
        setRepeatPassword(e.target.value)
    };

    //Login process validation:
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailWarning(false);
        setPasswordWarning(false);
        setRepeatPasswordWarning(false);

        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if(validateEmail(email) == false){
            e.preventDefault()
            setAlertText('Podany email jest nieprawidłowy!')
            setEmailWarning(true)
        } else if(password.length < 6){
            e.preventDefault()
            setAlertText('Podane hasło jest za krótkie!')
            setPasswordWarning(true)
        } else if(repeatPassword !== password){
            e.preventDefault()
            setAlertText('Hasła różnią się od siebie!')
            setRepeatPasswordWarning(true)
        } else {

            const userData={email:email, password: password}
            fetch(`http://localhost:3005/users?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    //console.log('Success:',data);
                    if(data.length > 0){
                        setAlertText('Istnieje już konto pod podanym adresem email. Jeżeli nie pamiętasz hasła wypełnij formularz kontaktowy.');
                        setRepeatPasswordWarning(true);
                    } else {
                        fetch('http://localhost:3005/users', {
                            method:'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify(userData)
                        })
                        .then(response => response.json())
                        .then(data => {                            
                            //console.log('Success:',data);
                            setShowSuccessText(true);
                            setEmail('');
                            setPassword('');
                            setRepeatPassword('');
                        })
                        .catch(error => {
                            console.log('Error',error);
                        })
                    }
                })
        }
    };

    return(
        <>
            <div className='mainPage'>
                <button className='btn marginCorrect'>
                    <Link
                        to="/">
                        Strona Główna
                    </Link>
                </button>
            </div>
            <h2 className='textUpDecoration fontCorrect' id='section4'>
                Załóż konto
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>

            <form onSubmit={handleSubmit} className='formMargin'>
                <div className='successText'>{showSuccessText ? <strong>Konto zostało założone!<br/>Możesz się zalogować.</strong> : null}</div>

                <div className='logFormBox'>
                    <div className='userBox userBoxReg'>

                        <label>Email</label>
                        <input type="text" name="email" placeholder='e-mail' value={email} onChange={handleEmail}></input>

                        <label>Hasło</label>
                        <input type="password" name="hasło" placeholder='hasło' value={password} onChange={handlePassword}></input>                       

                        <label>Powtórz hasło</label>
                        <input type="password" name="Powtórz hasło" placeholder='Powtórz hasło' value={repeatPassword} onChange={handleRepeatPassword}></input>
                        <div>{emailWarning ? <strong>{alertText}</strong> : null}</div>
                        <div>{passwordWarning ? <strong>{alertText}</strong> : null}</div>
                        <div>{repeatPasswordWarning ? <strong>{alertText}</strong> : null}</div>

                    </div>
                </div>
                
                <div className='submitBox'>

                    <button className="noBorderBtn">
                        <Link
                            to="/login">
                                Zaloguj się
                        </Link>                 
                    </button>

                    <button type='submit' className={classnames('noBorderBtn', { active: activeRegBtn == true })}>
                        Załóż konto             
                    </button>

                </div>
            </form>
        </>
    )
}