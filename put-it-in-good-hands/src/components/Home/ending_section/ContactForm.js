import React,{useState, useContext} from 'react';
import decoration from '../../../assets/Decoration.svg';
import classnames from 'classnames';
import {AuthContext} from '../../../App';

export default (props) => {

    const {isForm} = useContext(AuthContext);

    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');

    const [nameWarning,setNameWarning]=useState(false);
    const [emailWarning,setEmailWarning]=useState(false);
    const [messageWarning,setMessageWarning]=useState(false);
    const [showSuccessText,setShowSuccessText]=useState(false);

    const handleUserName= (e) => {
        setUserName(e.target.value)
    };

    const handleEmail= (e) => {
        setEmail(e.target.value)
    };

    const handleMessage= (e) => {
        setMessage(e.target.value)
    };


    //Form validation:
    const handleSubmit = (e) => {
        e.preventDefault()
        setNameWarning(false);
        setEmailWarning(false);
        setMessageWarning(false);
        
        function validateEmail(email) {
            const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        if((userName.indexOf(' ') > -1) || userName.length===0){
            e.preventDefault()
            setNameWarning(true)
        } else if(validateEmail(email) === false){
            e.preventDefault()
            setEmailWarning(true)
        } else if(message.length < 120){
            e.preventDefault()
            setMessageWarning(true)
        } else {
            const formData={name:userName, email:email, message: message}
            fetch('https://fer-api.coderslab.pl/v1/portfolio/contact', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                
                if (data.status === "success") {
                    setShowSuccessText(true);
                    setUserName('');
                    setEmail('');
                    setMessage('');
                    return
                } 
                console.warn(data.errors)
            })
            .catch(error => {
                console.log('Error',error);
            })
        }
    };
//className='formHomeBox'
    return (
        <div  className={classnames('formHomeBox',{formHomeBox2:isForm},{correctPosition:props.correctPosition},{correctPosition2:props.correctPosition2})}>
            <h2 className='textUpDecoration'>
                Skontaktuj się z nami
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
            <div className='successText'>{showSuccessText ? <strong>Wiadomość została wysłana!<br/>Wkrótce się skontaktujemy.</strong> : null}</div>

            <div className='formHome1'>
                <form onSubmit={handleSubmit} className='formHome'>
                    <div className='bigScreenFlex'>
                        <div>
                            <label>Wpisz swoje imię</label>
                            <input type="text" name="imie" placeholder='imię' value={userName} onChange={handleUserName}/>
                            <div>{nameWarning ? <strong>Podane imię jest nieprawidłowe</strong> : null}</div>
                        </div>

                        <div>
                        <label>Wpisz swój e-mail</label>
                            <input type="text" name="email" placeholder='e-mail' value={email} onChange={handleEmail} />
                            <div>{emailWarning ? <strong>Wprowadź poprawny adres e-mail</strong> : null}</div>
                        </div>
                    </div>

                    <label>Wpisz swoją wiadomość</label> 
                    <textarea rows="3" cols="30" name="texarea" placeholder='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga veritatis debitis id aut ab nihil, deleniti numquam minima explicabo porro fugit sit.' value={message} onChange={handleMessage}></textarea>
                    <div>{messageWarning ? <strong>Wiadomość musi zawierać conajmniej 120 znaków</strong> : null}</div>
                    
                    <div className='btnBox'>
                        <button type='submit' className='putThingsBtn'>
                            Wyślij
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}