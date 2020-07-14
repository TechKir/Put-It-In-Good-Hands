import React,{useState} from 'react';
import decoration from '../assets/Decoration.svg';
import classnames from 'classnames';
import HomeNav from './Home/welcome_section/HomeNav';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {

    const [activeRegBtn]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [repeatPassword, setRepeatPassword]=useState('');

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
        e.preventDefault()
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if(validateEmail(email) == false){
            e.preventDefault()
            setEmailWarning(true)
            return
        }else{
            setEmailWarning(false)
        }

        if(password.length < 6){
            e.preventDefault()
            setPasswordWarning(true)
            return
        }else{
            setPasswordWarning(false)
        }

        if((password.length < 6) || (repeatPassword !== password)){
            e.preventDefault()
            setRepeatPasswordWarning(true)
            return
        }else{
            setRepeatPasswordWarning(false)
        }

        if(emailWarning == false && passwordWarning== false && repeatPasswordWarning == false){

            const userData={email:email, password: password}
            fetch('http://localhost:3005/users', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:',data);
                setShowSuccessText(true);
                setEmail('');
                setPassword('');
                setRepeatPassword('');
            })
            .catch(error => {
                console.log('Error',error);
            })
        }
    };
    return(
        <>
            <HomeNav/>
            <h2 className='textUpDecoration' id='section4'>
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
                        <div>{emailWarning ? <strong>Podany email jest nieprawidłowy!</strong> : null}</div>

                        <label>Hasło</label>
                        <input type="password" name="hasło" placeholder='hasło' value={password} onChange={handlePassword}></input>
                        <div>{passwordWarning ? <strong>Podane hasło jest za krótkie!</strong> : null}</div>

                        <label>Powtórz hasło</label>
                        <input type="password" name="Powtórz hasło" placeholder='Powtórz hasło' value={repeatPassword} onChange={handleRepeatPassword}></input>
                        <div>{repeatPasswordWarning ? <strong>Hasła różnią się od siebie!</strong> : null}</div>
                    </div>
                </div>
                
                <div className='submitBox'>
                    <button className="noBorderBtn">
                        <Link
                            to="/login">
                                Zaloguj się
                        </Link>                 
                    </button>
                    <button type='submit' className={classnames('noBorderBtn', { active: activeRegBtn == true })}>      Załóż konto             
                    </button>
                </div>
            </form>

        </>
    )
}