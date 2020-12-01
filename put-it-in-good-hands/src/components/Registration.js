import React,{useState, useEffect, useContext} from 'react';
import decoration from '../assets/Decoration.svg';
import classnames from 'classnames';
import {AuthContext} from '../App';
import {
    useHistory,
    Link
    } from 'react-router-dom';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
import 'firebase/database';

export default () => {
    const history = useHistory();
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
        let validationPass = true;

        function validateEmail(email) {
            const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if(validateEmail(email) === false){
            e.preventDefault()
            setAlertText('Wprowadź poprawny adres e-mail')
            setEmailWarning(true)
            validationPass = false;
        }
        if(password.length < 6){
            e.preventDefault()
            setAlertText('Podane hasło jest za krótkie')
            setPasswordWarning(true)
            validationPass = false;
        }
        if(repeatPassword !== password){
            e.preventDefault()
            setAlertText('Podane hasła różnią się od siebie')
            setRepeatPasswordWarning(true)
            validationPass = false;
        } 
        if(validationPass) {

            const userData={email:email, password: password}
            //CODE IS IMPLEMENTED BY TWO SOLUTION: JSONSERVER AND FIREBASE. DEFAULT IS FIREBASE. YOU CAN COMMENT FIRST SOLUTION AND UNCOMMENT SECOND TO CHECK HOW DOES IT WORK.
            //FIREBASE:
            firebase.database().ref('users').once('value')
            .then( (snapshot) => {
                let users = snapshot.val();
                for (let i=0; i<users.length;i++){
                    if (users[i].email===userData.email){
                        setAlertText('Istnieje już konto pod podanym adresem email. Jeżeli nie pamiętasz hasła wypełnij formularz kontaktowy.');
                        setRepeatPasswordWarning(true);
                        return
                    }
                }
                firebase.database().ref(`users/${users.length}`).set({
                    "email": email,
                    "password":password,
                    "id":users.length+1                 
                })
                setShowSuccessText(true);
                setEmail('');
                setPassword('');
                setRepeatPassword('');
                setTimeout( () => history.push('/login'),2500)
            }) 

            //JSONSERVER:
            // fetch(`http://localhost:3005/users?email=${email}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         //console.log('Success:',data);
            //         if(data.length > 0){
            //             setAlertText('Istnieje już konto pod podanym adresem email. Jeżeli nie pamiętasz hasła wypełnij formularz kontaktowy.');
            //             setRepeatPasswordWarning(true);
            //         } else {
            //             fetch('http://localhost:3005/users', {
            //                 method:'POST',
            //                 headers:{
            //                     'Content-Type': 'application/json'
            //                 },
            //                 body:JSON.stringify(userData)
            //             })
            //             .then(response => response.json())
            //             .then(data => {                            
            //                 //console.log('Success:',data);
            //                 setShowSuccessText(true);
            //                 setEmail('');
            //                 setPassword('');
            //                 setRepeatPassword('');
            //             })
            //             .catch(error => {
            //                 console.log('Error',error);
            //             })
            //         }
            //     })
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
                <div className='successText'>{showSuccessText ? <strong>Konto zostało założone!<br/>Zaraz zostaniesz przekierowany<br/> do strony logowania.</strong> : null}</div>

                <div className='logFormBox'>
                    <div className='userBox userBoxReg'>

                        <label>E-mail</label>
                        <input type="text" name="email" placeholder='e-mail' value={email} onChange={handleEmail}></input>
                        <div className='warningDivs'>{emailWarning ? <strong>Wprowadź poprawny adres e-mail</strong> : null}</div>

                        <label>Hasło</label>
                        <input type="password" name="hasło" placeholder='hasło' value={password} onChange={handlePassword}></input>                       
                        <div className='warningDivs'>{passwordWarning ? <strong>{alertText}</strong> : null}</div>

                        <label>Powtórz hasło</label>
                        <input type="password" name="Powtórz hasło" placeholder='powtórz hasło' value={repeatPassword} onChange={handleRepeatPassword}></input>                     
                        <div className='warningDivs'>{repeatPasswordWarning ? <strong>{alertText}</strong> : null}</div>

                    </div>
                </div>
                
                <div className='submitBox'>

                    <button className="noBorderBtn">
                        <Link
                            to="/login">
                                Zaloguj się
                        </Link>                 
                    </button>

                    <button type='submit' className={classnames('noBorderBtn', { active: activeRegBtn === true })}>
                        Załóż konto             
                    </button>

                </div>
            </form>
        </>
    )
}