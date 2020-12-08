import React,{useState, useEffect, useContext} from 'react';
import decoration from '../assets/Decoration.svg';
import {AuthContext} from '../App';
import classnames from 'classnames';
import {
    useHistory,
    Link
    } from 'react-router-dom';
import firebase from "firebase/app";
import 'firebase/database';

export default () => {
    const history = useHistory();
    const { setUser,setIsHome,setIsForm } = useContext(AuthContext);

    useEffect( () => {
        setIsHome(false);
        setIsForm(false);
    },[setUser,setIsHome,setIsForm])

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
        let validationPass = true;
        function validateEmail(email) {
            const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        if(validateEmail(email) === false){
            e.preventDefault()
            setEmailWarning(true)
            validationPass = false;
        } 
        if(password.length < 6){
            e.preventDefault()
            setAlertText('Wprowadzone hasło jest za krótkie')
            setPasswordWarning(true)
            validationPass = false;
        } 
        if(validationPass) {
        //CODE IS IMPLEMENTED BY TWO SOLUTION: JSONSERVER AND FIREBASE. DEFAULT IS FIREBASE. YOU CAN COMMENT FIRST SOLUTION AND UNCOMMENT SECOND TO CHECK HOW DOES IT WORK.
        
        //FIREBASE:
        firebase.database().ref('users').once('value')
        .then( (snapshot) => {
            let users = snapshot.val();
            for (let i=0; i<users.length;i++){
                if (users[i].email===email && users[i].password===password ){
                    setTimeout( () => history.push('/'),500)
                    setAlertText('')
                    setUser({email: users[i].email, password: users[i].password, actualOrder: users[i].actualOrder || null, id: i})
                    return
                } else {
                    setAlertText('Wprowadzone dane są nieprawidłowe ')
                    setPasswordWarning(true)
                }
            }
        }) 
        
        //JSONSERVER:
        // fetch(`http://localhost:3005/users?email=${email}&password=${password}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:',data);
        //         console.log('Success:',data[0]);
        //         if(data.length>0){
        //             history.push('/')
        //             setUser(data[0])
        //         } else if ( data.length==0){
        //             setAlertText('Wprowadzone hasło jest nieprawidłowe lub nie założyłeś jeszcze konta')
        //             setPasswordWarning(true)
        //         }
        //     })
        //     .catch(error => {
        //         console.log('Error',error);
        //     })
        };
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
                Zaloguj się
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>

            <form onSubmit={handleSubmit} className='formMargin'>
                <div className='logFormBox'>
                    <div className='userBox boxSizeCorrect'>

                        <label>E-mail</label>
                        <input type="text" name="email" placeholder='e-mail' value={email} onChange={handleEmail}></input>
                        <div className='warningDivs'>{emailWarning ? <strong>Wprowadź poprawny adres e-mail</strong> : null}</div>
                        
                        <label>Hasło</label>
                        <input type="password" name="hasło" placeholder='hasło' value={password} onChange={handlePassword}></input>
                        <div className='warningDivs'>{passwordWarning ? <strong>{alertText}</strong> : null}</div>

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