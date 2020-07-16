import React,{useState, useEffect, useContext} from 'react';
import decoration from '../assets/Decoration.svg';
import HomeNav from './Home/welcome_section/HomeNav';
import {AuthContext} from '../App';
import classnames from 'classnames';
import {
    useHistory,
    Route,
    Link,
    Switch,
    NavLink,
    } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const { setUser,setIsHome } = useContext(AuthContext);

    useEffect( () => {
        setIsHome(false);
    },[])

    const [activeLoginBtn]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailWarning,setEmailWarning]=useState(false);
    const [passwordWarning,setPasswordWarning]=useState(false);

    const handleEmail= (e) => {
        setEmail(e.target.value)
    };

    const handlePassword= (e) => {
        setPassword(e.target.value)
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

        if(!emailWarning && !passwordWarning){

            fetch(`http://localhost:3005/users?email=${email}&password=${password}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:',data);
                    if(data.length>0){
                        history.push('/')
                        setUser(data[0])
                    }
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
                        <div>{emailWarning ? <strong>Podany email jest nieprawidłowy!</strong> : null}</div>

                        <label>Hasło</label>
                        <input type="password" name="hasło" placeholder='hasło' value={password} onChange={handlePassword}></input>
                        <div>{passwordWarning ? <strong>Podane hasło jest za krótkie!</strong> : null}</div>

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