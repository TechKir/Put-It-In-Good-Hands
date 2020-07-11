import React,{useState,useEffect} from 'react';
import decoration from '../../../assets/Decoration.svg';

export default () => {

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


    //form validation:
    const handleSubmit = (e) => {
        e.preventDefault()
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if((userName.indexOf(' ') > -1) || userName.length==0){
            e.preventDefault()
            setNameWarning(true)
            return
        }else{
            setNameWarning(false)
        }

        if(validateEmail(email) == false){
            e.preventDefault()
            setEmailWarning(true)
            return
        }else{
            setEmailWarning(false)
        }
        
        if(message.length < 120){
            e.preventDefault()
            setMessageWarning(true)
            return
        }else{
            setMessageWarning(false)
        }

        if(nameWarning== false && emailWarning == false && messageWarning == false){
            //const formData=[userName,email,message];
            let formData={name:userName, email:email, message: message}
            fetch('https://fer-api.coderslab.pl/v1/portfolio/contact', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:',data);
                setShowSuccessText(true);
                setUserName('');
                setEmail('');
                setMessage('');
            })
            .catch(error => {
                console.log('Error',error);
            })
        }
    };

    return (
        <>
            <h2 className='textUpDecoration'>
                Skontaktuj się z nami
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
            <div className='successText'>{showSuccessText ? <strong>Wiadomość została wysłana!<br/>Wkrótce się skontaktujemy.</strong> : null}</div>

            <div className='formHome1'>
                <form onSubmit={handleSubmit} className='formHome'>

                    <label>Wpis swoje imię</label>
                    <input type="text" name="imie" placeholder='imię' value={userName} onChange={handleUserName}/>
                    <div>{nameWarning ? <strong>Podane imię jest nieprawidłowe!</strong> : null}</div>

                    <label>Wpisz swój email</label>
                    <input type="text" name="email" placeholder='e-mail' value={email} onChange={handleEmail} />
                    <div>{emailWarning ? <strong>Podany email jest nieprawidłowy!</strong> : null}</div>

                    <label>Wpisz swoją wiadomość</label> 
                    <textarea rows="3" cols="30" name="texarea" placeholder='twoja wiadomość' value={message} onChange={handleMessage}></textarea>
                    <div>{messageWarning ? <strong>Wiadomość musi mieć conajmniej 120 znaków!</strong> : null}</div>
                    
                    <div className='btnBox'>
                        <button type='submit' className='putThingsBtn'>
                            Wyślij
                        </button>
                    </div>

                </form>
            </div>

        </>
    )
}