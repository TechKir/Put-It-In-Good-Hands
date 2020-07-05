import React from 'react';
import decoration from '../../../assets/Decoration.svg';

export default () => {
    return (
        <>
            <h2 className='textUpDecoration'>
                Skontaktuj się z nami
            </h2>
            <div className='decorationBox'>
                <img src={decoration} alt='decoration'/>
            </div>
            <div className='formHome1'>
                <form className='formHome'>
                    <label>Wpis swoje imię</label>
                    <input type="text" name="imie" placeholder='imię'/>
                    <label>Wpisz swój email</label> <input type="email" name="email" placeholder='e-mail' />
                    <label>Wpisz swoją wiadomość</label> 
                    <textarea rows="3" cols="30" name="texarea" placeholder='twoja wiadomość'></textarea>
                </form>
            </div>
            <div className='btnBox'>
                <button onSubmit={null} className='putThingsBtn'>
                    Wyślij
                </button>
            </div>
        </>
    )
}